using AutoMapper;
using MasterCatalog.Dal.Configuration;
using MasterCatalog.Dal.Contracts;
using MasterCatalog.Dal.DataTransferObjects;
using MasterCatalog.Domain.Models;
using Microsoft.Extensions.Options;

namespace MasterCatalog.Dal.Repositories
{
    internal sealed class UnitOfMeasureRepository : BaseRepository<UnitOfMeasureDTO>, IUnitOfMeasureRepository
    {
        private readonly IMapper _mapper;

        public UnitOfMeasureRepository(IOptions<DalOptions> options, IMapper mapper) : base(options)
        {
            _mapper = mapper;
        }

        void IUnitOfMeasureRepository.Delete(int id)
        {
            base.Delete(new UnitOfMeasureDTO() { UnitOfMeasureID = id });
        }

        UnitOfMeasure IUnitOfMeasureRepository.Get(int id)
        {
            var entity = base.Get(id);
            return _mapper.Map<UnitOfMeasure>(entity);
        }

        List<UnitOfMeasure> IUnitOfMeasureRepository.GetAll()
        {
            var entities = base.GetAll();
            return _mapper.Map<List<UnitOfMeasure>>(entities);
        }

        int IUnitOfMeasureRepository.Insert(UnitOfMeasure model)
        {
            var entity = _mapper.Map<UnitOfMeasureDTO>(model);
            model.UnitOfMeasureID = base.Insert(entity);
            return model.UnitOfMeasureID.Value;
        }

        void IUnitOfMeasureRepository.Update(UnitOfMeasure model)
        {
            var entity = _mapper.Map<UnitOfMeasureDTO>(model);
            base.Update(entity);
        }
    }
}
