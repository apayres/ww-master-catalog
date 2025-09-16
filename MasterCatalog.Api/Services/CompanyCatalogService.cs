using MasterCatalog.Dal.Contracts;
using MasterCatalog.Domain.Models;

namespace MasterCatalog.Items.Api.Services
{
    public class CompanyCatalogService : ICompanyCatalogService
    {
        private readonly IItemService _itemService;
        private readonly ICompanyCatalogRepository _companyCatalogRepository;
        private readonly ICompanyRepository _companyRepository;

        public CompanyCatalogService(IItemService itemRepository, ICompanyCatalogRepository companyCatalogRepository, ICompanyRepository companyRepository)
        {
            _itemService = itemRepository;
            _companyCatalogRepository = companyCatalogRepository;
            _companyRepository = companyRepository;
        }

        public CompanyCatalog GetByCompanyIDAndItemID(int companyID, int itemID)
        {
            return _companyCatalogRepository.GetByCompanyIDAndItemID(companyID, itemID);
        }

        public List<CompanyCatalog> GetByItemID(int itemID)
        {
            return _companyCatalogRepository.GetByItemID(itemID);
        }

        public List<CatalogItem> GetCatalogItems(string companyCode)
        {
            var company = _companyRepository.GetAll().FirstOrDefault(x => x.CompanyCode == companyCode);
            if (company == null)
            {
                return new List<CatalogItem>();
            }

            return GetCatalogItems(company.CompanyID.Value);
        }

        public List<CatalogItem> GetCatalogItems(int companyID)
        {
            var catalogItems = new List<CatalogItem>();

            var catalog = _companyCatalogRepository.GetByCompanyID(companyID);
            if (!catalog.Any())
            {
                return catalogItems;
            }

            var items = _itemService.GetItemsGroupByItemID();

            foreach (var catalogEntry in catalog)
            {
                if (!items.ContainsKey(catalogEntry.ItemID))
                {
                    continue;
                }

                var item = items[catalogEntry.ItemID];

                var catalogItem = new CatalogItem()
                {
                    ItemID = catalogEntry.ItemID,
                    CompanyCatalogID = catalogEntry.CompanyCatalogID.Value,
                    CompanyID = companyID,
                    ItemDescription = item.ItemDescription,
                    ItemName = item.ItemName,
                    UnitQuantity = item.UnitQuantity,
                    Upc = item.Upc,
                    RetailPrice = catalogEntry.RetailPrice,
                    UnitOfMeasureID = item.UnitOfMeasureID,
                    UnitOfMeasure = item.UnitOfMeasure,
                    Attributes = item.Attributes,
                    Images = item.Images,
                    Category = item.Category,
                    CategoryID = item.CategoryID
                };

                catalogItems.Add(catalogItem);
            }

            return catalogItems;
        }

        public CompanyCatalog InsertCatalogItem(CompanyCatalog catalogItem)
        {
            _companyCatalogRepository.Insert(catalogItem); 
            return catalogItem;
        }

        public CompanyCatalog UpdateCatalogItem(CompanyCatalog catalogItem)
        {
            _companyCatalogRepository.Update(catalogItem);
            return catalogItem;
        }

        public void DeleteCatalogItem(int companyCatalogID)
        {
            _companyCatalogRepository.Delete(companyCatalogID);
        }
    }
}
