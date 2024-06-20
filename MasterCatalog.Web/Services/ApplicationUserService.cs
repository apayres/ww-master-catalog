using MasterCatalog.Web.Authentication;

namespace MasterCatalog.Web.Services
{
    public class ApplicationUserService : ApiClient<ApplicationUser>, IApplicationUserService
    {
        private const string END_POINT = "ApplicationUser";

        public ApplicationUserService(IConfiguration configuration) : base(configuration)
        {
        }

        public ApplicationUser? GetApplicationUser(string userName, string password)
        {
            return base.Post(END_POINT, new { userName, password });
        }
    }
}
