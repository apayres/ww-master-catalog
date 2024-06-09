using MasterCatalog.Domain.Models;

namespace MasterCatalog.Api.Services
{
    public interface ICompanyService
    {
        void DeleteCompany(int id);
        List<Company> GetCompanies();
        Company GetCompany(int id);
        Company InsertCompany(Company company);
        Company UpdateCompany(Company company);
    }
}