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
            var companyCatalog = _companyCatalogService.GetByCompanyIDAndItemID(companyId, itemId);
            return companyCatalog;
        }

        [HttpGet("Items/{id}")]
        public ActionResult<List<CatalogItem>> Items(int id)
        {
            var catalogItems = _companyCatalogService.GetCatalogItems(id);
            return catalogItems;
        }

        [HttpGet("ByItem/{id}")]
        public ActionResult<List<CompanyCatalog>> GetByItem(int id)
        {
            var companyCatalog = _companyCatalogService.GetByItemID(id);
            return companyCatalog;
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
