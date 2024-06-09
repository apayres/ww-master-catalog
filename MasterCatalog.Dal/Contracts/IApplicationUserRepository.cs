using MasterCatalog.Domain.Models;

namespace MasterCatalog.Dal.Contracts
{
    public interface IApplicationUserRepository
    {
        ApplicationUser Get(string userName, string password);
    }
}
