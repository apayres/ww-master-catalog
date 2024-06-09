using MasterCatalog.Web.Models.Security;

namespace MasterCatalog.Web.Services
{
    public interface IApplicationUserService
    {
        ApplicationUser? GetApplicationUser(string userName, string password);
    }
}