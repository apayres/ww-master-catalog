using MasterCatalog.Domain.Models;

namespace MasterCatalog.Dal.Contracts
{
    public interface ICompanyCatalogRepository
    {
        int Insert(CompanyCatalog model);

        void Update(CompanyCatalog model);

        void Delete(int id);

        void DeleteByItemID(int id);

        void DeleteByCompanyID(int id);

        CompanyCatalog Get(int id);

        List<CompanyCatalog> GetByCompanyID(int companyID);

        List<CompanyCatalog> GetByItemID(int itemID);

        CompanyCatalog GetByCompanyIDAndItemID(int companyID, int itemID);
    }
}
