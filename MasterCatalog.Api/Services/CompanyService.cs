using MasterCatalog.Dal.Contracts;
using MasterCatalog.Domain.Models;

namespace MasterCatalog.Api.Services
{

    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly ICompanyCatalogRepository _companyCatalogRepository;

        public CompanyService(ICompanyRepository companyRepository, ICompanyCatalogRepository companyCatalogRepository)
        {
            _companyRepository = companyRepository;
            _companyCatalogRepository = companyCatalogRepository;
        }

        public Company GetCompany(int id)
        {
            return _companyRepository.Get(id);
        }

        public List<Company> GetCompanies()
        {
            return _companyRepository.GetAll();
        }

        public Company InsertCompany(Company company)
        {
            _companyRepository.Insert(company);
            return company;
        }

        public Company UpdateCompany(Company company)
        {
            _companyRepository.Update(company);
            return company;
        }

        public void DeleteCompany(int id)
        {
            _companyCatalogRepository.DeleteByCompanyID(id);
            _companyRepository.Delete(id);
        }
    }
}
