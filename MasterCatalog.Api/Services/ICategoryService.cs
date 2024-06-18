using MasterCatalog.Domain.Models;

namespace MasterCatalog.Api.Services
{
    public interface ICategoryService
    {
        void DeleteCategory(int id);
        List<Category> GetCategories();
        Dictionary<int, Category> GetCategoriesGroupedByCategoryID();
        Category GetCategory(int id);
        Category InsertCategory(Category category);
        Category UpdateCategory(Category category);
    }
}