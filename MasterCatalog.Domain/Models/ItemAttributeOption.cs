using System.ComponentModel.DataAnnotations;

namespace MasterCatalog.Domain.Models
{
    public class ItemAttributeOption
    {
        public int? ItemAttributeOptionID { get; set; }

        public int ItemAttributeID { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Option value is required")]
        public string AttributeOption { set; get; }
    }
}
