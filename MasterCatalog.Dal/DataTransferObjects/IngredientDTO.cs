using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasterCatalog.Dal.DataTransferObjects
{
    [Table("Ingredient")]
    internal class IngredientDTO
    {
        [Key]
        public int IngredientID {  get; set; }

        public int RecipeItemID { get; set; }

        public int ItemID {  get; set; }

        public double Ratio { get; set; }
    }
}
