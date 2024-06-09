using AutoMapper;
using MasterCatalog.Dal.Configuration;
using MasterCatalog.Dal.Contracts;
using MasterCatalog.Dal.DataTransferObjects;
using MasterCatalog.Domain.Models;
using Microsoft.Extensions.Options;

namespace MasterCatalog.Dal.Repositories
{
    internal sealed class ItemAttributeRepository : BaseRepository<ItemAttributeDTO>, IItemAttributeRepository
    {
        private readonly IMapper _mapper;

        public ItemAttributeRepository(IOptions<DalOptions> options, IMapper mapper) : base(options)
        {
            _mapper = mapper;
        }

        void IItemAttributeRepository.Delete(int id)
        {
            base.Delete(new ItemAttributeDTO { ItemAttributeID = id });
        }

        ItemAttribute IItemAttributeRepository.Get(int id)
        {
            var entity = base.Get(id);
            return _mapper.Map<ItemAttribute>(entity);
        }

        List<ItemAttribute> IItemAttributeRepository.GetAll()
        {
            var entities = base.GetAll();
            return _mapper.Map<List<ItemAttribute>>(entities);
        }

        int IItemAttributeRepository.Insert(ItemAttribute model)
        {
            var entity = _mapper.Map<ItemAttributeDTO>(model);
            model.ItemAttributeID = base.Insert(entity);
            return model.ItemAttributeID.Value;
        }

        void IItemAttributeRepository.Update(ItemAttribute model)
        {
            var entity = _mapper.Map<ItemAttributeDTO>(model);
            base.Update(entity);
        }
    }
}
