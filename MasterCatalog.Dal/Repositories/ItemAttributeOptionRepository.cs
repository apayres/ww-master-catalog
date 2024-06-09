using AutoMapper;
using MasterCatalog.Dal.Configuration;
using MasterCatalog.Dal.Contracts;
using MasterCatalog.Dal.DataTransferObjects;
using MasterCatalog.Domain.Models;
using Microsoft.Extensions.Options;

namespace MasterCatalog.Dal.Repositories
{
    internal sealed class ItemAttributeOptionRepository : BaseRepository<ItemAttributeOptionDTO>, IItemAttributeOptionRepository
    {
        private readonly IMapper _mapper;

        public ItemAttributeOptionRepository(IOptions<DalOptions> options, IMapper mapper) : base(options)
        {
            _mapper = mapper;
        }

        void IItemAttributeOptionRepository.Delete(int id)
        {
            base.Delete(new ItemAttributeOptionDTO { ItemAttributeOptionID = id });
        }

        void IItemAttributeOptionRepository.DeleteByItemAttributeID(int id)
        {
            base.DeleteMany(x => x.ItemAttributeID == id);
        }

        ItemAttributeOption IItemAttributeOptionRepository.Get(int id)
        {
            var entity = base.Get(id);
            return _mapper.Map<ItemAttributeOption>(entity);
        }

        List<ItemAttributeOption> IItemAttributeOptionRepository.GetAll()
        {
            var entities = base.GetAll();
            return _mapper.Map<List<ItemAttributeOption>>(entities);
        }

        List<ItemAttributeOption> IItemAttributeOptionRepository.GetByItemAttributeID(int id)
        {
            var entities = base.GetAll(x => x.ItemAttributeID == id);
            return _mapper.Map<List<ItemAttributeOption>>(entities);
        }

        int IItemAttributeOptionRepository.Insert(ItemAttributeOption model)
        {
            var entity = _mapper.Map<ItemAttributeOptionDTO>(model);
            model.ItemAttributeOptionID = base.Insert(entity);
            return model.ItemAttributeOptionID.Value;
        }

        void IItemAttributeOptionRepository.Update(ItemAttributeOption model)
        {
            var entity = _mapper.Map<ItemAttributeOptionDTO>(model);
            base.Update(entity);
        }
    }
}
