using MasterCatalog.Domain.Models;
using MasterCatalog.Items.Api.Models;

namespace MasterCatalog.Api.Services
{
    public interface IItemImageService
    {
        List<ItemImage> GetByItemID(int itemID);
        void DeleteImage(int itemImageID, string upc);
        void DeleteImage(ItemImage imageRecord, string container);
        void DeleteImagesByItem(Item item);
        void UpdateItemImage(ItemImage image);
        ItemImage UploadImage(ItemImageUploadModel model);
    }
}