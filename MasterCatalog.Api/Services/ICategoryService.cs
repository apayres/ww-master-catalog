using MasterCatalog.Domain.Models;

namespace MasterCatalog.Api.Services
{
    public interface ICategoryService
    {
        void DeleteCategory(int id);
        List<Category> GetCategories();
        Category GetCategory(int id);
        Category InsertCategory(Category category);
        Category UpdateCategory(Category category);
    }
}