using MasterCatalog.Domain.Models;

namespace MasterCatalog.Dal.Contracts
{
    public interface IItemImageRepository
    {
        int Insert(ItemImage model);

        void Update(ItemImage model);

        void Delete(int id);

        List<ItemImage> GetByItemID(int id);

        ItemImage Get(int id);
    }
}
