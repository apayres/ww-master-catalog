using MasterCatalog.Domain.Models;

namespace MasterCatalog.Items.Api.Services
{
    public interface IItemAttributeService
    {
        List<ItemAttribute> GetItemAttributes(int itemID);

        List<ItemAttribute> GetItemAttributesWithOptions();

        ItemAttribute? GetItemAttributeWithOptions(int id);

        ItemAttribute UpdateItemAttributeAndOptions(ItemAttribute itemAttribute);

        ItemAttribute InsertItemAttributeAndOptions(ItemAttribute itemAttribute);

        Dictionary<int, List<ItemAttribute>> GetItemAttributesGroupedByItemID();

        void DeleteItemAttribute(int id);

        void DeleteAttributeValuesByItemID(int id); 
    }
}
