namespace MasterCatalog.Web.Authentication
{
    public class ApplicationUser
    {
        public int? ApplicationUserID { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public ApplicationRole Role { get; set; }
    }
}
