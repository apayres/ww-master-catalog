using MasterCatalog.Web.Authentication;

namespace MasterCatalog.Web.Services
{
    public interface IApplicationUserService
    {
        ApplicationUser? GetApplicationUser(string userName, string password);
    }
}