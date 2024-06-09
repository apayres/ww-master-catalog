using MasterCatalog.Domain.Models;
using MasterCatalog.Dal.Contracts;
using MasterCatalog.Api.Services;

namespace MasterCatalog.Items.Api.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepository;
        private readonly IItemImageService _itemImageService;
        private readonly IItemAttributeService _itemAttributeService;
        private readonly IUnitOfMeasureService _unitOfMeasureService;
        private readonly IIngredientRepository _ingredientRepository;
        private readonly ICompanyCatalogRepository _companyCatalogRepository;

        public ItemService(IItemAttributeService itemAttributeService, IItemRepository itemRepository, IItemImageService itemImageService, IUnitOfMeasureService unitOfMeasureService, IIngredientRepository ingredientService, ICompanyCatalogRepository companyCatalogRepository)
        {
            _itemAttributeService = itemAttributeService;
            _itemRepository = itemRepository;
            _itemImageService = itemImageService;
            _unitOfMeasureService = unitOfMeasureService;
            _ingredientRepository = ingredientService;
            _companyCatalogRepository = companyCatalogRepository;
        }

        public List<Item> GetItems()
        {
            var items = _itemRepository.GetAll();
            var unitsOfMeasure = _unitOfMeasureService.GetUnitsOfMeasureGroupedByUnitOfMeasureID();

            foreach (var item in items)
            {
                if (!unitsOfMeasure.ContainsKey(item.UnitOfMeasureID))
                {
                    continue;
                }

                item.UnitOfMeasure = unitsOfMeasure[item.UnitOfMeasureID];
            }

            return items;
        }

        public Dictionary<int, Item> GetItemsGroupByItemID()
        {
            return GetItems().ToDictionary(x => x.ItemID.Value, y => y);
        }

        public Item? GetItemWithAttributes(int id)
        {
            Item item = _itemRepository.Get(id);
            if (item == null)
            {
                return null;
            }

            item.Attributes = _itemAttributeService.GetItemAttributes(id);
            item.Images = _itemImageService.GetByItemID(id);
            return item;
        }

        public Item InsertItem(Item item)
        {
            _itemRepository.Insert(item);
            return item;
        }

        public Item UpdateItem(Item item)
        {
            _itemRepository.Update(item);
            return item;
        }

        public void DeleteItem(int id)
        {
            var item = _itemRepository.Get(id);
            _itemAttributeService.DeleteAttributeValuesByItemID(id);
            _itemImageService.DeleteImagesByItem(item);
            _ingredientRepository.DeleteByRecipeItemID(id);
            _companyCatalogRepository.DeleteByItemID(id);
            _itemRepository.Delete(id);
        }

    }
}
