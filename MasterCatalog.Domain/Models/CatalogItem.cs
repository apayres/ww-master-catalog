namespace MasterCatalog.Domain.Models
{
    public class CatalogItem : Item
    {
        public int CompanyCatalogID { get; set; }

        public int CompanyID { set; get; }

        public double RetailPrice { get; set; }
    }
}
