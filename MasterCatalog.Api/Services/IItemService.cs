using MasterCatalog.Domain.Models;

namespace MasterCatalog.Items.Api.Services
{
    public interface IItemService
    {
        List<Item> GetItems();
        Item InsertItem(Item item);
        Item UpdateItem(Item item);
        Dictionary<int, Item> GetItemsGroupByItemID();
        Item? GetItem(int id);
        void DeleteItem(int id);
    }
}