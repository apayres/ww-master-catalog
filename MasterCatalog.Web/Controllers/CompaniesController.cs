using MasterCatalog.Web.Models.Company;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Web.Controllers
{
    public class CompaniesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Catalog(int companyId)
        {
            var model = new CatalogViewModel()
            {
                CompanyID = companyId
            };

            return View(model);
        }
    }
}
