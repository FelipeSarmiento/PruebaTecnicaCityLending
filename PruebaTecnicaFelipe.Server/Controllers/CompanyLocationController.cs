using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaFelipe.Server.Context;
using PruebaTecnicaFelipe.Server.Models;

namespace PruebaTecnicaFelipe.Server.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class CompanyLocationController : ControllerBase
{
    private readonly CompanyLocationService _companyLocationService;

    public CompanyLocationController(CompanyLocationService companyLocationService)
    {
        _companyLocationService = companyLocationService;
    }

    [HttpPost]
    public async Task<IActionResult> UpdatedCompanyLocation([FromBody] CompanyLocationModel companyLocationModel)
    {
        var result = await _companyLocationService.UpdateCompanyLocation(companyLocationModel);
        if (result.Item1)
        {
            return Ok(new { message = result.Item2, success = true });
        }

        return BadRequest(new { message = result.Item2, success = false });
    }

    [HttpPost]
    public async Task<IActionResult> AddCompanyLocation([FromBody] CompanyLocationModel companyLocationModel)
    {
        var result = await _companyLocationService.AddCompanyLocation(companyLocationModel);
        if (result.Item1)
        {
            return Ok(new { message = result.Item2, success = true });
        }

        return BadRequest(new { message = result.Item2, success = false });
    }

    [HttpGet]
    public async Task<IActionResult> DeleteCompanyLocation(int IdCompanyLocation)
    {
        var result = await _companyLocationService.DeleteCompanyLocation(IdCompanyLocation);
        if (result.Item1)
        {
            return Ok(new { message = result.Item2, success = true });
        }

        return BadRequest(new { message = result.Item2, success = false });
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCompanyLocations()
    {
        var result = await _companyLocationService.GetAllCompanyLocations();

        if (result.Item1)
        {
            return Ok(new { message = result.Item2, success = true, data = result.Item3 });
        }

        return BadRequest(new { message = result.Item2, success = false, data = new { } });
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCompanyLocationsAvailable()
    {
        var result = await _companyLocationService.GetAllCompanyLocationsAvailable();

        if (result.Item1)
        {
            return Ok(new { message = result.Item2, success = true, data = result.Item3 });
        }

        return BadRequest(new { message = result.Item2, success = false, data = new { } });
    }

    [HttpGet]
    public async Task<ActionResult<PagedResponse<CompanyLocationModel>>> GetCompanyLocationsPaged(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {

        if (pageNumber < 1 || pageSize < 1)
        {
            return BadRequest("pageNumber y pageSize deben ser mayores que 0.");
        }

        var result = await _companyLocationService.GetCompanyLocationsPaged(pageNumber, pageSize);

        if (result.Item1)
        {
            var response = new PagedResponse<CompanyLocationModel>
            {
                Data = result.Item3.Item1,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = result.Item3.Item2,
                TotalPages = (int)Math.Ceiling(result.Item3.Item2 / (double)pageSize)
            };

            return Ok(new { message = result.Item2, success = true, data = response });
        }
        else
        {
            return BadRequest(new { message = result.Item2, success = false, data = new { } });
        }
    }

    [HttpGet]
    public async Task<ActionResult<PagedResponse<CompanyLocationInnerModel>>> GetCompanyLocationsPagedByUser([FromQuery] int idUser, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {

        if (pageNumber < 1 || pageSize < 1)
        {
            return BadRequest("pageNumber y pageSize deben ser mayores que 0.");
        }

        var result = await _companyLocationService.GetCompanyLocationsPagedByUser(pageNumber, pageSize, idUser);

        if (result.Item1)
        {
            var response = new PagedResponse<CompanyLocationInnerModel>
            {
                Data = result.Item3.Item1,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = result.Item3.Item2,
                TotalPages = (int)Math.Ceiling(result.Item3.Item2 / (double)pageSize)
            };

            return Ok(new { message = result.Item2, success = true, data = response });
        }
        else
        {
            return BadRequest(new { message = result.Item2, success = false, data = new { } });
        }
    }
}