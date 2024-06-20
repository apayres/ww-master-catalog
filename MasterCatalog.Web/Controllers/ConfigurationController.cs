using MasterCatalog.Web.Models.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Web.Controllers
{
    public class ConfigurationController : Controller
    {
        private readonly IConfiguration _configuration;

        public ConfigurationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return new JsonResult(new ConfigurationModel()
            {
                ApiBaseUrl = _configuration.GetValue<string>("ApiEndPointUrl").ToString()
            });
        }
    }
}
