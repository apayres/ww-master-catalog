using MasterCatalog.Api.Services;
using MasterCatalog.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Items.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CompanyController : ControllerBase
    {
        private readonly ILogger<CompanyController> _logger;
        private readonly ICompanyService _companyService;

        public CompanyController(ILogger<CompanyController> logger, ICompanyService companyService)
        {
            _logger = logger;
            _companyService = companyService;
        }

        [HttpGet("{id}")]
        public ActionResult<Company> Get(int id)
        {
            var company = _companyService.GetCompany(id);
            if (company == null)
            {
                return NotFound();
            }

            return company;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Company>> Get()
        {
            return _companyService.GetCompanies();
        }

        [HttpPost]
        public ActionResult<Company> Post(Company company)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _companyService.InsertCompany(company);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Could not insert company");
                throw;
            }

            return company;
        }

        [HttpPut]
        public ActionResult<Company> Put(Company company)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _companyService.UpdateCompany(company);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not update company");
                throw;
            }

            return company;
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _companyService.DeleteCompany(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not delete company");
                throw;
            }

            return Ok();
        }
    }
}
