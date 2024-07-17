using AutoMapper;
using MasterCatalog.Dal.Configuration;
using MasterCatalog.Dal.Contracts;
using MasterCatalog.Dal.DataTransferObjects;
using MasterCatalog.Domain.Models;
using Microsoft.Extensions.Options;

namespace MasterCatalog.Dal.Repositories
{
    internal class ItemImageRepository : BaseRepository<ItemImageDTO>, IItemImageRepository
    {
        private readonly IMapper _mapper;

        public ItemImageRepository(IOptions<DalOptions> options, IMapper mapper) : base(options)
        {
            _mapper = mapper;
        }

        void IItemImageRepository.Delete(int id)
        {
            base.Delete(new ItemImageDTO { ItemImageID = id });
        }

        ItemImage IItemImageRepository.Get(int id)
        {
            var entity = base.Get(id);
            return _mapper.Map<ItemImage>(entity);
        }

        List<ItemImage> IItemImageRepository.GetAll()
        {
            var entities = base.GetAll();
            return _mapper.Map<List<ItemImage>>(entities);
        }

        List<ItemImage> IItemImageRepository.GetByItemID(int id)
        {
            var entities = base.GetAll(x => x.ItemID == id);
            return _mapper.Map<List<ItemImage>>(entities);
        }

        int IItemImageRepository.Insert(ItemImage model)
        {
            var entity = _mapper.Map<ItemImageDTO>(model);
            model.ItemImageID = base.Insert(entity);
            return model.ItemImageID.Value;
        }

        void IItemImageRepository.Update(ItemImage model)
        {
            var entity = _mapper.Map<ItemImageDTO>(model);
            base.Update(entity);
        }
    }
}
