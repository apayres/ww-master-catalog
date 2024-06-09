using MasterCatalog.Dal.Contracts;
using MasterCatalog.Domain.Models;
using MasterCatalog.Items.Api.Services;

namespace MasterCatalog.Api.Services
{
    public class IngredientService : IIngredientService
    {
        private readonly IIngredientRepository _ingredientRepository;
        private readonly IItemService _itemService;

        public IngredientService(IIngredientRepository ingredientRepository, IItemService itemService)
        {
            _ingredientRepository = ingredientRepository;
            _itemService = itemService;
        }

        public Ingredient GetIngredient(int id)
        {
            return _ingredientRepository.Get(id);
        }

        public List<Ingredient> GetRecipe(int recipeItemID)
        {
            var ingredients = _ingredientRepository.GetByItemID(recipeItemID);
            if (!ingredients.Any())
            {
                return ingredients;
            }

            var items = _itemService.GetItemsGroupByItemID();
            foreach (var ingredient in ingredients)
            {
                if (!items.ContainsKey(ingredient.ItemID))
                {
                    continue;
                }

                ingredient.Item = items[ingredient.ItemID];
            }

            return ingredients;
        }

        public Ingredient InsertIngredient(Ingredient ingredient)
        {
            _ingredientRepository.Insert(ingredient);
            return ingredient;
        }

        public Ingredient UpdateIngredient(Ingredient ingredient)
        {
            _ingredientRepository.Update(ingredient);
            return ingredient;
        }

        public void DeleteIngredient(int id)
        {
            _ingredientRepository.Delete(id);
        }

        public void DeleteIngredientsByRecipeItemID(int id)
        {
            var itemIngredients = _ingredientRepository.GetByItemID(id);
            if (itemIngredients.Any())
            {
                itemIngredients.ForEach(x => DeleteIngredient(x.IngredientID.Value));
            }
        }
    }
}
