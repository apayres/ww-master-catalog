using System.ComponentModel.DataAnnotations;

namespace MasterCatalog.Domain.Models
{
    public class Company
    {
        public int? CompanyID { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Company name is required")]
        public string CompanyName { get; set; }
    }
}
