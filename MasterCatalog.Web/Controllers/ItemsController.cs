using MasterCatalog.Web.Models.Items;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Web.Controllers
{
    public class ItemsController : Controller
    {
        public IActionResult Item(int? id, int? previousPage)
        {
            var model = new IndexViewModel()
            {
                ItemID = id,
                PreviousPageNumber = previousPage
            };

            return View(model);
        }

        public IActionResult Index(string? searchTerm, int? pageNumber)
        {
            var model = new ListViewModel()
            {
                SearchTerm = searchTerm,
                PageNumber = pageNumber
            };

            return View(model);
        }
    }
}
