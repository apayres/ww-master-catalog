using MasterCatalog.Dal.Contracts;
using MasterCatalog.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApplicationUserController : ControllerBase
    {
        private readonly IApplicationUserRepository _repository;
        private readonly ILogger<CategoryController> _logger;

        public ApplicationUserController(ILogger<CategoryController> logger, IApplicationUserRepository repository)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpPost]
        public ActionResult<ApplicationUser> Post([FromForm] string userName, [FromForm] string password)
        {
            try
            {
                return _repository.Get(userName, password);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Could not get user: {ex.Message}");
                throw;
            }
        }
    }
}
