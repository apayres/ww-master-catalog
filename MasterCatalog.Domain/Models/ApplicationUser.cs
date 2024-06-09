using MasterCatalog.Domain.Enums;

namespace MasterCatalog.Domain.Models
{
    public class ApplicationUser
    {
        public int? ApplicationUserID { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public ApplicationRole Role {  get; set; }

    }
}
