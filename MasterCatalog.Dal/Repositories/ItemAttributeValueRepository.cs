using AutoMapper;
using MasterCatalog.Dal.Configuration;
using MasterCatalog.Dal.Contracts;
using MasterCatalog.Dal.DataTransferObjects;
using MasterCatalog.Domain.Models;
using Microsoft.Extensions.Options;

namespace MasterCatalog.Dal.Repositories
{
    internal sealed class ItemAttributeValueRepository : BaseRepository<ItemAttributeValueDTO>, IItemAttributeValueRepository
    {
        private readonly IMapper _mapper;

        public ItemAttributeValueRepository(IOptions<DalOptions> options, IMapper mapper) : base(options)
        {
            _mapper = mapper;
        }

        void IItemAttributeValueRepository.Delete(int id)
        {
            base.Delete(new ItemAttributeValueDTO() { ItemAttributeValueID = id });
        }

        void IItemAttributeValueRepository.DeleteByItemAttributeID(int id)
        {
            base.DeleteMany(x => x.ItemAttributeID == id);
        }

        void IItemAttributeValueRepository.DeleteByItemID(int id)
        {
            base.DeleteMany(x => x.ItemID == id);
        }

        ItemAttributeValue IItemAttributeValueRepository.Get(int id)
        {
            var entity = base.Get(id);
            return _mapper.Map<ItemAttributeValue>(entity);
        }

        List<ItemAttributeValue> IItemAttributeValueRepository.GetByItemAttributeID(int id)
        {
            var entities = base.GetAll(x => x.ItemAttributeID == id);
            return _mapper.Map<List<ItemAttributeValue>>(entities);
        }

        List<ItemAttributeValue> IItemAttributeValueRepository.GetByItemID(int id)
        {
            var entities = base.GetAll(x => x.ItemID == id);
            return _mapper.Map<List<ItemAttributeValue>>(entities);
        }


        int IItemAttributeValueRepository.Insert(ItemAttributeValue model)
        {
            var entity = _mapper.Map<ItemAttributeValueDTO>(model);
            model.ItemAttributeValueID = base.Insert(entity);
            return model.ItemAttributeValueID.Value;
        }

        void IItemAttributeValueRepository.Update(ItemAttributeValue model)
        {
            var entity = _mapper.Map<ItemAttributeValueDTO>(model);
            base.Update(entity);
        }
    }
}
