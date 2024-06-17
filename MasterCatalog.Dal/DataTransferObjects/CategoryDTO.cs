using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasterCatalog.Dal.DataTransferObjects
{
    [Table("Category")]
    internal class CategoryDTO
    {
        [Key]
        public int? CategoryID { get; set; }

        public string CategoryName { get; set; }

        public string CategoryDescription { get; set; }

        public int? ParentCategoryID {  get; set; }
    }
}
