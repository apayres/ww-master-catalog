using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasterCatalog.Dal.DataTransferObjects
{
    [Table("ItemAttributeOption")]
    internal class ItemAttributeOptionDTO
    {
        [Key]
        public int ItemAttributeOptionID { get; set; }

        public int ItemAttributeID { get; set; }

        public string AttributeOption { set; get; }
    }
}
