namespace MasterCatalog.Domain.Models
{
    public class Category
    {
        public int? CategoryID { get; set; }

        public string CategoryName { get; set; }

        public string CategoryDescription { get; set; }

        public int? ParentCategoryID { get; set; }

        public Category? ParentCategory { get; set; }

        public List<Category>? SubCategories { get; set; }
    }
}
