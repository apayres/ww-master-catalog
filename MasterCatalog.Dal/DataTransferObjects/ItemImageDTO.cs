using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasterCatalog.Dal.DataTransferObjects
{
    [Table("ItemImage")]
    internal class ItemImageDTO
    {
        [Key]
        public int? ItemImageID {  get; set; }

        public int ItemID { set; get; }

        public string AbsoluteUri { get; set; }

        public int DisplayOrder { get; set; }
    }
}
