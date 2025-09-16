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
            try
            {
                var item = _itemService.GetItem(id);
                if (item == null)
                {
                    return NotFound();
                }

                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Could not get item: {ex.Message}");
                throw;
            }
        }

        [HttpGet]
        public ActionResult<IEnumerable<Item>> Get()
        {
            try
            {
                return _itemService.GetItems();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Could not get items: {ex.Message}");
                throw;
            }
        }

        [HttpGet ("ingredients")]
        public ActionResult<IEnumerable<Item>> GetIngredients()
        {
            try
            {
                return _itemService.GetIngredients();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Could not get items: {ex.Message}");
                throw;
            }

        }

        [HttpGet("menuitems")]
        public ActionResult<IEnumerable<Item>> GetMenuItems()
        {
            try
            {
                return _itemService.GetMenuItems();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Could not get items: {ex.Message}");
                throw;
            }

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
