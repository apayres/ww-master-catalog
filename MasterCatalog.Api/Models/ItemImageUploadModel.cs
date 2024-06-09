using MasterCatalog.Domain.Models;
using MasterCatalog.Items.Api.Utilities;

namespace MasterCatalog.Items.Api.Models
{
    public class ItemImageUploadModel
    {
        public ItemImage ImageDetails { set; get; }

        public FileToUpload UploadData { set; get; }
    }
}
