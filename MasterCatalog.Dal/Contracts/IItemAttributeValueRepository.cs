using MasterCatalog.Domain.Models;

namespace MasterCatalog.Dal.Contracts
{
    public interface IItemAttributeValueRepository
    {
        int Insert(ItemAttributeValue model);

        void Update(ItemAttributeValue model);

        void Delete(int id);
        
        void DeleteByItemID(int id);

        void DeleteByItemAttributeID(int id);

        ItemAttributeValue Get(int id);

        List<ItemAttributeValue> GetByItemID(int id);

        List<ItemAttributeValue> GetByItemAttributeID(int id);

        List<ItemAttributeValue> GetAll();
    }
}
