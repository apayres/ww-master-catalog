using MasterCatalog.Domain.Models;

namespace MasterCatalog.Items.Api.Services
{
    public interface ICompanyCatalogService
    {
        CompanyCatalog GetByCompanyIDAndItemID(int companyID, int itemID);
        List<CompanyCatalog> GetByItemID(int itemID);
        List<CatalogItem> GetCatalogItems(int companyID);
        List<CatalogItem> GetCatalogItems(string companyCode);
        CompanyCatalog InsertCatalogItem(CompanyCatalog catalogItem);
        CompanyCatalog UpdateCatalogItem(CompanyCatalog catalogItem);
        void DeleteCatalogItem(int companyCatalogID);

    }
}