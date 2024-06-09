using MasterCatalog.Dal.Contracts;
using MasterCatalog.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Items.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemAttributeValueController : ControllerBase
    {
        private readonly ILogger<ItemAttributeValueController> _logger;
        private readonly IItemAttributeValueRepository _attributeValueRepository;

        public ItemAttributeValueController(ILogger<ItemAttributeValueController> logger, IItemAttributeValueRepository attributeValueRepository)
        {
            _logger = logger;
            _attributeValueRepository = attributeValueRepository;
        }

        [HttpGet]
        public ActionResult<List<ItemAttributeValue>> Get(int itemId)
        {
            return _attributeValueRepository.GetByItemID(itemId);
        }

        [HttpPost]
        public ActionResult<ItemAttributeValue> Post(ItemAttributeValue itemAttributeValue)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _attributeValueRepository.Insert(itemAttributeValue);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not insert item attribute value");
                throw;
            }

            return itemAttributeValue;
        }

        [HttpPut]
        public ActionResult<ItemAttributeValue> Put(ItemAttributeValue itemAttributeValue)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _attributeValueRepository.Update(itemAttributeValue);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not update item attribute value");
                throw;
            }

            return itemAttributeValue;
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _attributeValueRepository.Delete(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not delete item attribute value");
                throw;
            }

            return Ok();
        }
    }
}
