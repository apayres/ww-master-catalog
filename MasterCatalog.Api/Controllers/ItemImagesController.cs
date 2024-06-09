using MasterCatalog.Api.Services;
using MasterCatalog.Domain.Models;
using MasterCatalog.Items.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Items.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemImagesController : ControllerBase
    {
        private readonly ILogger<CompanyController> _logger;
        private readonly IItemImageService _itemImageService;

        public ItemImagesController(ILogger<CompanyController> logger, IItemImageService itemImageService)
        {
            _logger = logger;
            _itemImageService = itemImageService;
        }

        [HttpGet("{id}")]
        public ActionResult<List<ItemImage>> Get(int id)
        {
            var images = _itemImageService.GetByItemID(id);
            return images.OrderBy(x => x.DisplayOrder).ToList();
        }

        [HttpPost]
        public ActionResult<ItemImage> UploadImage([FromForm] ItemImageUploadModel model)
        {
            if (model == null || model.UploadData == null || model.UploadData.FileData == null)
            {
                return BadRequest("No file found to upload.");
            }

            var containerName = model.UploadData.Container.Trim().ToLower();
            if (string.IsNullOrEmpty(containerName))
            {
                return BadRequest("container name must exist.");
            }

            return _itemImageService.UploadImage(model);
        }

        [HttpPut]
        public ActionResult<ItemImage> Put(ItemImage image)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _itemImageService.UpdateItemImage(image);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not update image");
                throw;
            }

            return image;
        }

        [HttpDelete]
        public ActionResult Delete(int id, string upc)
        {
            try
            {
                _itemImageService.DeleteImage(id, upc);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not delete image");
                throw;
            }

            return Ok();
        }
    }
}
