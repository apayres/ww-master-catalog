using MasterCatalog.Dal.Contracts;
using MasterCatalog.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Items.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemAttributeOptionController : ControllerBase
    {
        private readonly ILogger<ItemAttributeOptionController> _logger;
        private readonly IItemAttributeOptionRepository _attributeOptionRepository;

        public ItemAttributeOptionController(ILogger<ItemAttributeOptionController> logger, IItemAttributeOptionRepository attributeOptionRepository)
        {
            _logger = logger;
            _attributeOptionRepository = attributeOptionRepository;
        }

        [HttpGet("GetOptions/{id}")]
        public ActionResult<IEnumerable<ItemAttributeOption>> Get(int id)
        {
            return _attributeOptionRepository.GetByItemAttributeID(id);
        }

        [HttpPost]
        public ActionResult<ItemAttributeOption> Post(ItemAttributeOption itemAttributeOption)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _attributeOptionRepository.Insert(itemAttributeOption);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not insert item attribute option");
                throw;
            }

            return itemAttributeOption;
        }

        [HttpPut]
        public ActionResult<ItemAttributeOption> Put(ItemAttributeOption itemAttributeOption)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _attributeOptionRepository.Update(itemAttributeOption);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not update item attribute option");
                throw;
            }

            return itemAttributeOption;
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _attributeOptionRepository.Delete(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not delete item attribute options");
                throw;
            }

            return Ok();
        }
    }
}

