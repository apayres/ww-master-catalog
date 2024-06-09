using System.ComponentModel.DataAnnotations;

namespace MasterCatalog.Domain.Models
{
    public class UnitOfMeasure
    {
        public int? UnitOfMeasureID { get; set; }


        [Required(AllowEmptyStrings = false, ErrorMessage = "UOM name is required")]
        public string UnitOfMeasureName { get; set; }

        public string UnitOfMeasureDescription { get; set; }
    }
}
