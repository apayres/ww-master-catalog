using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Web.Controllers
{
    public class CategoriesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
