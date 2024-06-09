using MasterCatalog.Domain.Models;

namespace MasterCatalog.Dal.Contracts
{
    public interface IIngredientRepository
    {
        int Insert(Ingredient model);

        void Update(Ingredient model);

        void Delete(int id);

        void DeleteByRecipeItemID(int id);

        Ingredient Get(int id);

        List<Ingredient> GetByItemID(int id);
    }
}
