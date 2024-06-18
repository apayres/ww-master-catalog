using System.ComponentModel.DataAnnotations;

namespace MasterCatalog.Domain.Models
{
    public class Item
    {
        public Item()
        {
            Attributes = new List<ItemAttribute>();
            Images = new List<ItemImage>();
        }

        public int? ItemID { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Upc is required")]
        public string Upc { set; get; }


        [Required(AllowEmptyStrings = false, ErrorMessage = "Item name is required")]
        public string ItemName { get; set; }

        public string ItemDescription { get; set; }

        [DeniedValues(0, ErrorMessage = "UOM identifier is required")]
        public int UnitOfMeasureID { set; get; }

        [DeniedValues(0, ErrorMessage = "Item quantity is required")]
        public double UnitQuantity { set; get; }

        public int CategoryID { set; get; }

        public List<ItemAttribute> Attributes { get; set; }

        public Category? Category { get; set; }

        public UnitOfMeasure? UnitOfMeasure { get; set; }

        public List<ItemImage> Images { get; set; }
    }
}
