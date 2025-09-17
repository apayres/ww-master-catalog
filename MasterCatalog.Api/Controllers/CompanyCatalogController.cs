using MasterCatalog.Domain.Models;
using MasterCatalog.Items.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Items.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CompanyCatalogController : ControllerBase
    {
        private readonly ILogger<CompanyCatalogController> _logger;
        private readonly ICompanyCatalogService _companyCatalogService;

        public CompanyCatalogController(ILogger<CompanyCatalogController> logger, ICompanyCatalogService companyCatalogService)
        {
            _logger = logger;
            _companyCatalogService = companyCatalogService;
        }

        [HttpGet]
        public ActionResult<CompanyCatalog> Get(int companyId, int itemId)
        {
            try
            {
                var companyCatalog = _companyCatalogService.GetByCompanyIDAndItemID(companyId, itemId);
                return companyCatalog;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Could not load catalog item {ex.Message}");
                throw;
            }
        }

        [HttpGet("Items/{id}")]
        public ActionResult<List<CatalogItem>> Items(int id)
        {
            try
            {
                var catalogItems = _companyCatalogService.GetCatalogItems(id);
                return catalogItems;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Could not load catalog items {ex.Message}");
                throw;
            }
        }

        [HttpGet("Catalog/{companyCode}")]
        public ActionResult<List<CatalogItem>> Catalog(string companyCode)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(companyCode))
                {
                    throw new Exception("Company code must have a value");
                }

                var catalogItems = _companyCatalogService.GetCatalogItems(companyCode);
                return catalogItems;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Could not get company catalog: {ex.Message}");
                throw;
            }
        }

        [HttpGet("ByItem/{id}")]
        public ActionResult<List<CompanyCatalog>> GetByItem(int id)
        {
            try
            {
                var companyCatalog = _companyCatalogService.GetByItemID(id);
                return companyCatalog;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Could not load item {ex.Message}");
                throw;
            }
        }

        [HttpPost]
        public ActionResult<CompanyCatalog> Post(CompanyCatalog catalogItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _companyCatalogService.InsertCatalogItem(catalogItem);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not add item to company catalog");
                throw;
            }

            return catalogItem;
        }

        [HttpPut]
        public ActionResult<CompanyCatalog> Put(CompanyCatalog catalogItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _companyCatalogService.UpdateCatalogItem(catalogItem);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not update item in company catalog");
                throw;
            }

            return catalogItem;
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _companyCatalogService.DeleteCatalogItem(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not delete item from company catalog");
                throw;
            }

            return Ok();
        }
    }
}
