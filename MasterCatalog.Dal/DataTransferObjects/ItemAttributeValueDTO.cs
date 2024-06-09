using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasterCatalog.Dal.DataTransferObjects
{
    [Table("ItemAttributeValue")]
    internal class ItemAttributeValueDTO
    {
        [Key]
        public int ItemAttributeValueID { get; set; }

        public int ItemAttributeID { get; set; }

        public int ItemID { get; set; }

        public string AttributeValue { set; get; }
        public int DisplayOrder { set; get; }
    }
}
