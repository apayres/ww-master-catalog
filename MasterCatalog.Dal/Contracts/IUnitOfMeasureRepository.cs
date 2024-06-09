using MasterCatalog.Domain.Models;

namespace MasterCatalog.Dal.Contracts
{
    public interface IUnitOfMeasureRepository
    {
        int Insert(UnitOfMeasure model);

        void Update(UnitOfMeasure model);

        void Delete(int id);

        UnitOfMeasure Get(int id);

        List<UnitOfMeasure> GetAll();
    }
}
