using MasterCatalog.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace MasterCatalog.Domain.Models
{
    public class ItemAttribute
    {
        public ItemAttribute()
        {
            AttributeOptions = new List<ItemAttributeOption>();
        }

        public int? ItemAttributeID { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Attribute name is required")]
        public string AttributeName { get; set; }

        public string AttributeDescription { set; get; }

        public ItemAttributeValue? AttributeValue { get; set; }

        public List<ItemAttributeOption> AttributeOptions { get; set; }

        public int AttributeDataTypeID { get; set; }
    }
}
