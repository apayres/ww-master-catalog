using System.ComponentModel.DataAnnotations;

namespace MasterCatalog.Domain.Models
{
    public class CompanyCatalog
    {
        public int? CompanyCatalogID { get; set; }

        [DeniedValues(0, ErrorMessage = "Company identifier is required")]
        public int CompanyID { get; set; }

        [DeniedValues(0, ErrorMessage = "Item identifier is required")]
        public int ItemID { get; set; }

        public double RetailPrice { get; set; }

        public Item? Item { set; get; }
    }
}
