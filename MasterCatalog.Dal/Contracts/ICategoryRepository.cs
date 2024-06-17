using MasterCatalog.Domain.Models;

namespace MasterCatalog.Dal.Contracts
{
    public interface ICategoryRepository
    {
        int Insert(Category model);

        void Update(Category model);

        void Delete(int id);

        void DeleteByParentCategory(int id);

        Category Get(int id);

        List<Category> GetAll();

        List<Category> GetSubCategories(int id);
    }
}
