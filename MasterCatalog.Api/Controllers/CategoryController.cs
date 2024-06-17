using MasterCatalog.Api.Services;
using MasterCatalog.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ILogger<CategoryController> _logger;
        private readonly ICategoryService _categoryService;

        public CategoryController(ILogger<CategoryController> logger, ICategoryService categoryService)
        {
            _categoryService = categoryService;
            _logger = logger;
        }

        [HttpGet("{id}")]
        public ActionResult<Category> Get(int id)
        {
            var category = _categoryService.GetCategory(id);
            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Category>> Get()
        {
            return _categoryService.GetCategories();
        }

        [HttpPost]
        public ActionResult<Category> Post(Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _categoryService.InsertCategory(category);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not insert category");
                throw;
            }

            return category;
        }

        [HttpPut]
        public ActionResult<Category> Put(Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _categoryService.UpdateCategory(category);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not update category");
                throw;
            }

            return category;
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _categoryService.DeleteCategory(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not delete category");
                throw;
            }

            return Ok();
        }
    }
}
