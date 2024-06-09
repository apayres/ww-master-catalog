using MasterCatalog.Domain.Models;

namespace MasterCatalog.Dal.Contracts
{
    public interface IItemAttributeRepository
    {
        int Insert(ItemAttribute model);

        void Update(ItemAttribute model);

        void Delete(int id);

        ItemAttribute Get(int id);

        List<ItemAttribute> GetAll();
    }
}
