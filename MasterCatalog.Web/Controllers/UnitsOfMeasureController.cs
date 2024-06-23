using MasterCatalog.Web.Models.UnitOfMeasure;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Web.Controllers
{
    public class UnitsOfMeasureController : Controller
    {
        public IActionResult Index()
        {
            var model = new IndexViewModel();
            return View(model);
        }
    }
}
