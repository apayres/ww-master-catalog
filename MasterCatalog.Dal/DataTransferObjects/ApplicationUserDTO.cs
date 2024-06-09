using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasterCatalog.Dal.DataTransferObjects
{
    [Table("ApplicationUser")]
    internal class ApplicationUserDTO
    {
        [Key]
        public int? ApplicationUserID { get; set; }

        public string UserName { set; get; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Password { get; set; }

        public int ApplicationRoleID { get; set; }
    }
}
