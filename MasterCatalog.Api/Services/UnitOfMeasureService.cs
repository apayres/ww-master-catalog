using MasterCatalog.Dal.Contracts;
using MasterCatalog.Domain.Models;

namespace MasterCatalog.Api.Services
{
    public class UnitOfMeasureService : IUnitOfMeasureService
    {
        private readonly IUnitOfMeasureRepository _unitOfMeasureRepository;

        public UnitOfMeasureService(IUnitOfMeasureRepository unitOfMeasureRepository)
        {
            _unitOfMeasureRepository = unitOfMeasureRepository;
        }

        public List<UnitOfMeasure> GetUnitsOfMeasure()
        {
            return _unitOfMeasureRepository.GetAll();
        }

        public Dictionary<int, UnitOfMeasure> GetUnitsOfMeasureGroupedByUnitOfMeasureID()
        {
            return GetUnitsOfMeasure().ToDictionary(x => x.UnitOfMeasureID.Value, y => y);
        }

        public UnitOfMeasure InsertUnitOfMeasure(UnitOfMeasure unitOfMeasure)
        {
            _unitOfMeasureRepository.Insert(unitOfMeasure);
            return unitOfMeasure;
        }

        public UnitOfMeasure UpdateUnitOfMeasure(UnitOfMeasure unitOfMeasure)
        {
            _unitOfMeasureRepository.Update(unitOfMeasure);
            return unitOfMeasure;
        }

        public void DeleteUnitOfMeasure(int unitOfMeasureID)
        {
            _unitOfMeasureRepository.Delete(unitOfMeasureID);
        }
    }
}
