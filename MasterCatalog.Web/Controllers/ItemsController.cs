using MasterCatalog.Web.Models.Items;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Web.Controllers
{
    public class ItemsController : Controller
    {
        public IActionResult Item(int? id)
        {
            var model = new IndexViewModel()
            {
                ItemID = id
            };

            return View(model);
        }

        public IActionResult Index(string? searchTerm)
        {
            var model = new ListViewModel()
            {
                SearchTerm = searchTerm
            };

            return View(model);
        }
    }
}
