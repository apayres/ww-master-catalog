using MasterCatalog.Domain.Models;

namespace MasterCatalog.Api.Services
{
    public interface IIngredientService
    {
        void DeleteIngredient(int id);

        void DeleteIngredientsByRecipeItemID(int id);
        Ingredient GetIngredient(int id);
        List<Ingredient> GetRecipe(int recipeItemID);
        Ingredient InsertIngredient(Ingredient ingredient);
        Ingredient UpdateIngredient(Ingredient ingredient);
    }
}