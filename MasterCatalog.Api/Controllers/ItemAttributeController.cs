using MasterCatalog.Domain.Models;
using MasterCatalog.Items.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Items.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemAttributeController : ControllerBase
    {
        private readonly ILogger<ItemAttributeController> _logger;
        private readonly IItemAttributeService _attributeService;

        public ItemAttributeController(ILogger<ItemAttributeController> logger, IItemAttributeService itemAttributeService)
        {
            _logger = logger;
            _attributeService = itemAttributeService;
        }

        [HttpGet("{id}")]
        public ActionResult<ItemAttribute> Get(int id)
        {
            var item = _attributeService.GetItemAttributeWithOptions(id);
            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ItemAttribute>> Get()
        {
            return _attributeService.GetItemAttributesWithOptions();
        }



        [HttpGet("ByItem/{id}")]
        public ActionResult<IEnumerable<ItemAttribute>> ByItem(int id)
        {
            return _attributeService.GetItemAttributes(id);
        }

        [HttpPost]
        public ActionResult<ItemAttribute> Post(ItemAttribute itemAttribute)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _attributeService.InsertItemAttributeAndOptions(itemAttribute);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not insert item attribute");
                throw;
            }

            return itemAttribute;
        }

        [HttpPut]
        public ActionResult<ItemAttribute> Put(ItemAttribute itemAttribute)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _attributeService.UpdateItemAttributeAndOptions(itemAttribute);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not update item attribute");
                throw;
            }

            return itemAttribute;
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _attributeService.DeleteItemAttribute(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not delete item attributes");
                throw;
            }

            return Ok();
        }
    }
}
