using MasterCatalog.Domain.Models;

namespace MasterCatalog.Dal.Contracts
{
    public interface ICompanyRepository
    {
        int Insert(Company model);

        void Update(Company model);
        
        void Delete(int id);

        Company Get(int id);

        List<Company> GetAll();
    }
}
