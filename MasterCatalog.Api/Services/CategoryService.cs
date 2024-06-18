using MasterCatalog.Dal.Contracts;
using MasterCatalog.Domain.Models;

namespace MasterCatalog.Api.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public List<Category> GetCategories()
        {
            List<Category> categories = new List<Category>();
            List<Category> allCategories = _categoryRepository.GetAll();

            foreach (Category category in allCategories.Where(x => !x.ParentCategoryID.HasValue))
            {
                category.SubCategories = allCategories.Where(x => x.ParentCategoryID == category.CategoryID).ToList();

                if (category.ParentCategoryID.HasValue)
                {
                    category.ParentCategory = allCategories.FirstOrDefault(x => x.ParentCategoryID == category.ParentCategoryID.Value);
                }

                categories.Add(category);
            }

            return categories;
        }

        public Dictionary<int, Category> GetCategoriesGroupedByCategoryID()
        {
            var categories = _categoryRepository.GetAll();
            foreach (var category in categories) {
                if (category.ParentCategoryID.HasValue)
                {
                    category.ParentCategory = categories.FirstOrDefault(x => x.CategoryID == category.ParentCategoryID);
                }
            }

            return categories.ToDictionary(x => x.CategoryID.Value, y => y);
        }

        public Category GetCategory(int id)
        {
            Category category = _categoryRepository.Get(id);            
            category.SubCategories = _categoryRepository.GetSubCategories(id);

            if (category.ParentCategoryID.HasValue)
            {
                category.ParentCategory = _categoryRepository.Get(category.ParentCategoryID.Value);
            }

            return category;
        }

        public Category InsertCategory(Category category)
        {
            _categoryRepository.Insert(category);
            return category;
        }

        public Category UpdateCategory(Category category)
        {
            _categoryRepository.Update(category);
            return category;
        }

        public void DeleteCategory(int id)
        {
            _categoryRepository.DeleteByParentCategory(id);
            _categoryRepository.Delete(id);
        }

    }
}
