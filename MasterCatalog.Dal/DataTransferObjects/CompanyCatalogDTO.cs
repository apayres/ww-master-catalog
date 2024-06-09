using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasterCatalog.Dal.DataTransferObjects
{
    [Table("CompanyCatalog")]
    internal class CompanyCatalogDTO
    {
        [Key]
        public int CompanyCatalogID { get; set; }

        public int CompanyID { get; set; }

        public int ItemID { get; set; }

        public double RetailPrice { get; set; }
    }
}
