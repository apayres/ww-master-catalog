using System.ComponentModel.DataAnnotations;

namespace MasterCatalog.Domain.Models
{
    public class Ingredient
    {
        public int? IngredientID { get; set; }


        [DeniedValues(0, ErrorMessage = "Recipe item identifier is required")]
        public int RecipeItemID { get; set; }

        [DeniedValues(0, ErrorMessage = "Item identifier is required")]
        public int ItemID { get; set; }

        public Item? Item { set; get; }


        [DeniedValues(0, ErrorMessage = "Ingredient ratio is required")]
        public double Ratio { get; set; }
    }
}
