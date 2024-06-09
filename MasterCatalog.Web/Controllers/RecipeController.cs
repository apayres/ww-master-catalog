using MasterCatalog.Web.Models.Items;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Web.Controllers
{
    public class RecipeController : Controller
    {
        public IActionResult Index(int? id)
        {
            var model = new IndexViewModel()
            {
                ItemID = id
            };

            return View(model);
        }
    }
}
