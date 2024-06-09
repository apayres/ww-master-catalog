using MasterCatalog.Api.Services;
using MasterCatalog.Dal.Contracts;
using MasterCatalog.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Items.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IngredientController : ControllerBase
    {
        private readonly ILogger<CompanyController> _logger;
        private readonly IIngredientService _ingredientService;

        public IngredientController(ILogger<CompanyController> logger, IIngredientService ingredientService)
        {
            _logger = logger;
            _ingredientService = ingredientService;
        }

        [HttpGet("{id}")]
        public ActionResult<Ingredient> Get(int id)
        {
            var ingredient = _ingredientService.GetIngredient(id);
            if (ingredient == null)
            {
                return NotFound();
            }

            return ingredient;
        }

        [HttpGet("Recipe/{id}")]
        public ActionResult<List<Ingredient>> GetRecipe(int id)
        {
            var recipe = _ingredientService.GetRecipe(id);
            return recipe;
        }

        [HttpPost]
        public ActionResult<Ingredient> Post(Ingredient ingredient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _ingredientService.InsertIngredient(ingredient);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not insert ingredient");
                throw;
            }

            return ingredient;
        }

        [HttpPut]
        public ActionResult<Ingredient> Put(Ingredient ingredient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _ingredientService.UpdateIngredient(ingredient);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not update ingredient");
                throw;
            }

            return ingredient;
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _ingredientService.DeleteIngredient(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not delete ingredient");
                throw;
            }

            return Ok();
        }
    }
}
