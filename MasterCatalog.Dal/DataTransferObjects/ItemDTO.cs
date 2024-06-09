using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasterCatalog.Dal.DataTransferObjects
{
    [Table("Item")]
    internal class ItemDTO
    {
        [Key]
        public int ItemID { get; set; }

        public string Upc { set; get; }

        public string ItemName { get; set; }

        public string ItemDescription { get; set; }

        public int UnitOfMeasureID { set; get; }

        public double UnitQuantity { set; get; }
    }
}
