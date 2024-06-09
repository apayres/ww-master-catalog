using MasterCatalog.Domain.Models;
using MasterCatalog.Dal.Contracts;
using MasterCatalog.Items.Api.Utilities;
using MasterCatalog.Items.Api.Models;

namespace MasterCatalog.Api.Services
{
    public class ItemImageService : IItemImageService
    {

        private readonly IItemImageRepository _itemImageRepository;
        private readonly IFileManager _fileManager;

        public ItemImageService(IItemImageRepository itemImageRepository, IFileManager fileManager)
        {
            _itemImageRepository = itemImageRepository;
            _fileManager = fileManager;
        }

        public List<ItemImage> GetByItemID(int itemID)
        {
            return _itemImageRepository.GetByItemID(itemID);
        }

        public ItemImage UploadImage(ItemImageUploadModel model)
        {
            var uploadedFile = _fileManager.UploadFile(model.UploadData);
            model.ImageDetails.AbsoluteUri = uploadedFile.Url;
            model.ImageDetails.ItemImageID = _itemImageRepository.Insert(model.ImageDetails);
            return model.ImageDetails;
        }

        public void UpdateItemImage(ItemImage image)
        {
            _itemImageRepository.Update(image);
        }

        public void DeleteImagesByItem(Item item)
        {
            var itemImages = _itemImageRepository.GetByItemID(item.ItemID.Value);
            itemImages.ForEach(x => DeleteImage(x, item.Upc));
        }

        public void DeleteImage(int itemImageID, string upc)
        {
            var image = _itemImageRepository.Get(itemImageID);
            DeleteImage(image, upc);
        }

        public void DeleteImage(ItemImage imageRecord, string container)
        {
            _fileManager.DeleteFile(imageRecord.AbsoluteUri, container);
            _itemImageRepository.Delete(imageRecord.ItemImageID.Value);
        }

    }
}
