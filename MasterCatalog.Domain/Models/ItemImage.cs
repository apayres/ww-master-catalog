namespace MasterCatalog.Domain.Models
{
    public class ItemImage
    {
        public int? ItemImageID { get; set; }

        public int ItemID {  get; set; }

        public string? AbsoluteUri { get; set; }

        public int DisplayOrder { get; set; }
    }
}
