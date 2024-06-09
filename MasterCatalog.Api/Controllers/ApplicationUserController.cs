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

        public ApplicationUserController(IApplicationUserRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public ActionResult<ApplicationUser> Post([FromForm] string userName, [FromForm] string password)
        {
            return _repository.Get(userName, password);
        }
    }
}
