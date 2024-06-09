using AutoMapper;
using MasterCatalog.Dal.Configuration;
using MasterCatalog.Dal.Contracts;
using MasterCatalog.Dal.DataTransferObjects;
using MasterCatalog.Domain.Models;
using Microsoft.Extensions.Options;

namespace MasterCatalog.Dal.Repositories
{
    internal sealed class ItemRepository : BaseRepository<ItemDTO>, IItemRepository
    {
        private readonly IMapper _mapper;

        public ItemRepository(IOptions<DalOptions> options, IMapper mapper) : base(options)
        {
            _mapper = mapper;
        }

        void IItemRepository.Delete(int id)
        {
            base.Delete(new ItemDTO { ItemID = id });
        }

        Item IItemRepository.Get(int id)
        {
            var entity = base.Get(id);
            return _mapper.Map<Item>(entity);
        }

        List<Item> IItemRepository.GetAll()
        {
            var entities = base.GetAll();
            return _mapper.Map<List<Item>>(entities);
        }

        int IItemRepository.Insert(Item model)
        {
            var entity = _mapper.Map<ItemDTO>(model);
            model.ItemID = base.Insert(entity);
            return model.ItemID.Value;
        }

        void IItemRepository.Update(Item model)
        {
            var entity = _mapper.Map<ItemDTO>(model);
            base.Update(entity);
        }
    }
}
