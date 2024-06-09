using MasterCatalog.Api.Services;
using MasterCatalog.Dal.Contracts;
using MasterCatalog.Domain.Models;

namespace MasterCatalog.Items.Api.Services
{
    public class CompanyCatalogService : ICompanyCatalogService
    {
        private readonly IItemService _itemService;
        private readonly IUnitOfMeasureService _unitOfMeasureService;
        private readonly ICompanyCatalogRepository _companyCatalogRepository;

        public CompanyCatalogService(IItemService itemRepository, ICompanyCatalogRepository companyCatalogRepository, IUnitOfMeasureService unitOfMeasureRepository)
        {
            _itemService = itemRepository;
            _companyCatalogRepository = companyCatalogRepository;
            _unitOfMeasureService = unitOfMeasureRepository;
        }

        public CompanyCatalog GetByCompanyIDAndItemID(int companyID, int itemID)
        {
            return _companyCatalogRepository.GetByCompanyIDAndItemID(companyID, itemID);
        }

        public List<CompanyCatalog> GetByItemID(int itemID)
        {
            return _companyCatalogRepository.GetByItemID(itemID);
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
            var unitsOfMeasure = _unitOfMeasureService.GetUnitsOfMeasureGroupedByUnitOfMeasureID();

            foreach (var catalogEntry in catalog)
            {
                if (!items.ContainsKey(catalogEntry.ItemID))
                {
                    continue;
                }

                var item = items[catalogEntry.ItemID];
                if (!unitsOfMeasure.ContainsKey(item.UnitOfMeasureID))
                {
                    continue;
                }

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
                    UnitOfMeasure = unitsOfMeasure[item.UnitOfMeasureID],
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
