using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasterCatalog.Dal.DataTransferObjects
{
    [Table("Company")]
    internal class CompanyDTO
    {
        [Key]
        public int CompanyID { get; set; }

        public string CompanyName { get; set;}

        public string CompanyCode { get; set;}
    }
}
