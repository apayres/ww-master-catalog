using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasterCatalog.Dal.DataTransferObjects
{
    [Table("ItemAttribute")]
    internal class ItemAttributeDTO
    {
        [Key]
        public int ItemAttributeID { get; set; }

        public string AttributeName { get; set; }

        public string AttributeDescription { set; get; }

        public int ItemAttributeDataTypeID { get; set; }    
    }
}
