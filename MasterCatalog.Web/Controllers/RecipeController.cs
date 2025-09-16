using MasterCatalog.Web.Models.Items;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Web.Controllers
{
    public class RecipeController : Controller
    {
        public IActionResult Index(int? id, int? previousPage)
        {
            var model = new IndexViewModel()
            {
                ItemID = id,
                PreviousPageNumber = previousPage
            };

            return View(model);
        }
    }
}
