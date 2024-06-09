using MasterCatalog.Web.Models.Shared;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Web.ViewComponents
{
    public class JavaScriptSettingsViewComponent : ViewComponent
    {
        private readonly IConfiguration _configuration;

        public JavaScriptSettingsViewComponent(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IViewComponentResult Invoke()
        {
            var model = new JavascriptSettingsModel()
            {
                ApiBaseUrl = _configuration.GetValue<string>("ApiEndPointUrl").ToString()
            };

            return View(model);
        }
    }
}
