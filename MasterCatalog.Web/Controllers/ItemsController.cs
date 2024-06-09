using MasterCatalog.Web.Models.Items;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Web.Controllers
{
    public class ItemsController : Controller
    {
        public IActionResult Index(int? id)
        {
            var model = new IndexViewModel()
            {
                ItemID = id
            };

            return View(model);
        }

        public IActionResult List(string? searchTerm)
        {
            var model = new ListViewModel()
            {
                SearchTerm = searchTerm
            };

            return View(model);
        }
    }
}
