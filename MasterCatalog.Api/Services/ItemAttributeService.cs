using MasterCatalog.Dal.Contracts;
using MasterCatalog.Domain.Models;

namespace MasterCatalog.Items.Api.Services
{
    public class ItemAttributeService : IItemAttributeService
    {
        private readonly IItemAttributeRepository _attributeRepository;
        private readonly IItemAttributeOptionRepository _attributeOptionRepository;
        private readonly IItemAttributeValueRepository _attributeValueRepository;

        public ItemAttributeService(IItemAttributeRepository attributeRepository, IItemAttributeOptionRepository attributeOptionRepository, IItemAttributeValueRepository attributeValueRepository)
        {
            _attributeRepository = attributeRepository;
            _attributeOptionRepository = attributeOptionRepository;
            _attributeValueRepository = attributeValueRepository;
        }

        public List<ItemAttribute> GetItemAttributes(int itemID)
        {
            var attributes = _attributeRepository.GetAll();
            var itemAttributeValues = _attributeValueRepository.GetByItemID(itemID);

            var attributeValuesByAttributeID = new Dictionary<int, ItemAttributeValue>();
            foreach (var attrValue in itemAttributeValues)
            {
                if (!attributeValuesByAttributeID.ContainsKey(attrValue.ItemAttributeID))
                {
                    attributeValuesByAttributeID.Add(attrValue.ItemAttributeID, attrValue);
                }
            }

            Dictionary<int, List<ItemAttributeOption>> attributeOptionsByAttributeID = _attributeOptionRepository.GetAll()
                .GroupBy(x => x.ItemAttributeID)
                .ToDictionary(i => i.Key, g => g.ToList());

            foreach (var attribute in attributes)
            {
                if (attributeOptionsByAttributeID.ContainsKey(attribute.ItemAttributeID.Value))
                {
                    attribute.AttributeOptions = attributeOptionsByAttributeID[attribute.ItemAttributeID.Value];
                }

                if (attributeValuesByAttributeID.ContainsKey(attribute.ItemAttributeID.Value))
                {
                    attribute.AttributeValue = attributeValuesByAttributeID[attribute.ItemAttributeID.Value];
                }
            }

            return attributes.OrderBy(x => x.AttributeValue == null ? 9999 : x.AttributeValue.DisplayOrder).ToList();
        }

        public Dictionary<int, List<ItemAttribute>> GetItemAttributesGroupedByItemID()
        {
            var attributes = _attributeRepository.GetAll();
            var attributeValues = _attributeValueRepository.GetAll();
            var itemIDs = attributeValues.Select(x => x.ItemID).Distinct();

            var attributesGroupedByItem = new Dictionary<int, List<ItemAttribute>>();
            foreach (var itemID in itemIDs)
            {
                if (!attributesGroupedByItem.ContainsKey(itemID))
                {
                    attributesGroupedByItem.Add(itemID, new List<ItemAttribute>());
                }

                var itemAttributeValues = attributeValues.Where(x => x.ItemID == itemID);
                foreach (var attrValue in itemAttributeValues)
                {
                    var attribute = attributes.FirstOrDefault(x => x.ItemAttributeID == attrValue.ItemAttributeID);
                    if(attribute == null)
                    {
                        continue;
                    }

                    attributesGroupedByItem[itemID].Add(new ItemAttribute()
                    {
                        AttributeDataTypeID = attribute.AttributeDataTypeID,
                        AttributeDescription = attribute.AttributeDescription,
                        AttributeName = attribute.AttributeName,
                        AttributeValue = attrValue,
                        ItemAttributeID = attribute.ItemAttributeID
                    });
                }
            }

            return attributesGroupedByItem;
        }

        public List<ItemAttribute> GetItemAttributesWithOptions()
        {
            var attributes = _attributeRepository.GetAll();
            var options = _attributeOptionRepository.GetAll();

            foreach (var attribute in attributes)
            {
                attribute.AttributeOptions = options.Where(x => x.ItemAttributeID == attribute.ItemAttributeID).ToList();
            }

            return attributes;
        }

        public ItemAttribute? GetItemAttributeWithOptions(int id)
        {
            ItemAttribute attribute = _attributeRepository.Get(id);
            if (attribute == null)
            {
                return null;
            }

            attribute.AttributeOptions = _attributeOptionRepository.GetByItemAttributeID(id);
            return attribute;
        }

        public ItemAttribute InsertItemAttributeAndOptions(ItemAttribute itemAttribute)
        {
            var id = _attributeRepository.Insert(itemAttribute);


            foreach (var option in itemAttribute.AttributeOptions)
            {
                option.ItemAttributeID = id;
                _attributeOptionRepository.Insert(option);
            }

            return GetItemAttributeWithOptions(id);
        }

        public ItemAttribute UpdateItemAttributeAndOptions(ItemAttribute itemAttribute)
        {
            _attributeRepository.Update(itemAttribute);
            var existingOptions = _attributeOptionRepository.GetByItemAttributeID(itemAttribute.ItemAttributeID.Value);

            foreach (var existingOption in existingOptions)
            {
                var matchingOption = itemAttribute.AttributeOptions.FirstOrDefault(x => x.ItemAttributeOptionID == existingOption.ItemAttributeOptionID);
                if(matchingOption == null)
                {
                    _attributeOptionRepository.Delete(existingOption.ItemAttributeOptionID.Value);
                    continue;
                }

                if(matchingOption.AttributeOption == existingOption.AttributeOption)
                {
                    continue;
                }

                _attributeOptionRepository.Update(matchingOption);
            }

            var newOptions = itemAttribute.AttributeOptions.Where(x => !x.ItemAttributeOptionID.HasValue).ToList();
            newOptions.ForEach(x => _attributeOptionRepository.Insert(x));

            return GetItemAttributeWithOptions(itemAttribute.ItemAttributeID.Value);
        }

        public void DeleteItemAttribute(int id)
        {
            _attributeOptionRepository.DeleteByItemAttributeID(id);
            _attributeValueRepository.DeleteByItemAttributeID(id);
            _attributeRepository.Delete(id);
        }

        public void DeleteAttributeValuesByItemID(int id)
        {
            _attributeValueRepository.DeleteByItemID(id);
        }
    }
}
