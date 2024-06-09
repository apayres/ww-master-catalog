using System.ComponentModel.DataAnnotations;

namespace MasterCatalog.Domain.Models
{
    public class ItemAttributeValue
    {
        public int? ItemAttributeValueID { get; set; }

        [DeniedValues(0, ErrorMessage = "Item Attribute identifier is required")]
        public int ItemAttributeID { get; set; }

        [DeniedValues(0, ErrorMessage = "Item identifier is required")]
        public int ItemID { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Attribute value is required")]
        public string AttributeValue { set; get; } = string.Empty;

        public int DisplayOrder { set; get; }
    }
}
