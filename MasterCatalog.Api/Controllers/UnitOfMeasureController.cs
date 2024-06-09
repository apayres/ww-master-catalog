using MasterCatalog.Api.Services;
using MasterCatalog.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasterCatalog.Items.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UnitOfMeasureController : ControllerBase
    {
        private readonly ILogger<UnitOfMeasureController> _logger;
        private readonly IUnitOfMeasureService _unitOfMeasureService;

        public UnitOfMeasureController(ILogger<UnitOfMeasureController> logger, IUnitOfMeasureService unitOfMeasureService)
        {
            _logger = logger;
            _unitOfMeasureService = unitOfMeasureService;
        }

        [HttpGet]
        public ActionResult<List<UnitOfMeasure>> Get()
        {
            return _unitOfMeasureService.GetUnitsOfMeasure();
        }

        [HttpPost]
        public ActionResult<UnitOfMeasure> Post(UnitOfMeasure unitOfMeasure)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _unitOfMeasureService.InsertUnitOfMeasure(unitOfMeasure);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not insert unit of measure");
                throw;
            }

            return unitOfMeasure;
        }

        [HttpPut]
        public ActionResult<UnitOfMeasure> Put(UnitOfMeasure unitOfMeasure)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _unitOfMeasureService.UpdateUnitOfMeasure(unitOfMeasure);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not update unit of measure");
                throw;
            }

            return unitOfMeasure;
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _unitOfMeasureService.DeleteUnitOfMeasure(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not delete unit of measure");
                throw;
            }

            return Ok();
        }
    }
}
