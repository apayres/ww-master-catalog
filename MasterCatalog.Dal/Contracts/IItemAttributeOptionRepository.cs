using MasterCatalog.Domain.Models;

namespace MasterCatalog.Dal.Contracts
{
    public interface IItemAttributeOptionRepository
    {
        int Insert(ItemAttributeOption model);

        void Update(ItemAttributeOption model);

        void Delete(int id);

        void DeleteByItemAttributeID(int id);

        ItemAttributeOption Get(int id);

        List<ItemAttributeOption> GetAll();

        List<ItemAttributeOption> GetByItemAttributeID(int id);
    }
}
