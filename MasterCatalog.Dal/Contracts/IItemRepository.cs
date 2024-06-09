using MasterCatalog.Domain.Models;

namespace MasterCatalog.Dal.Contracts
{
    public interface IItemRepository
    {
        int Insert(Item model);

        void Update(Item model);

        void Delete(int id);

        Item Get(int id);

        List<Item> GetAll();
    }
}
