using MasterCatalog.Domain.Models;

namespace MasterCatalog.Api.Services
{
    public interface IUnitOfMeasureService
    {
        void DeleteUnitOfMeasure(int unitOfMeasureID);
        List<UnitOfMeasure> GetUnitsOfMeasure();
        Dictionary<int, UnitOfMeasure> GetUnitsOfMeasureGroupedByUnitOfMeasureID();
        UnitOfMeasure InsertUnitOfMeasure(UnitOfMeasure unitOfMeasure);
        UnitOfMeasure UpdateUnitOfMeasure(UnitOfMeasure unitOfMeasure);
    }
}