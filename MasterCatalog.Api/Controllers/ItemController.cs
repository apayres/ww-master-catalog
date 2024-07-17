using MasterCatalog.Dal.Contracts;
using MasterCatalog.Domain.Models;
using MasterCatalog.Items.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Items.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly ILogger<ItemController> _logger;
        private readonly IItemService _itemService;

        public ItemController(ILogger<ItemController> logger, IItemService itemService)
        {
            _logger = logger;
            _itemService = itemService;
        }

        [HttpGet("{id}")]
        public ActionResult<Item> Get(int id)
        {
            var item = _itemService.GetItem(id);
            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Item>> Get()
        {
            return _itemService.GetItems();
        }

        [HttpPost]
        public ActionResult<Item> Post(Item item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _itemService.InsertItem(item);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not insert item");
                throw;
            }

            return item;
        }

        [HttpPut]
        public ActionResult<Item> Put(Item item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _itemService.UpdateItem(item);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not update item");
                throw;
            }

            return item;
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _itemService.DeleteItem(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not delete item");
                throw;
            }

            return Ok();
        }
    }
}
