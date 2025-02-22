using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaFelipe.Server.Context;
using PruebaTecnicaFelipe.Server.Models;

namespace PruebaTecnicaFelipe.Server.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class ScheduleController : ControllerBase
{
    private readonly ScheduleService _scheduleService;

    public ScheduleController(ScheduleService scheduleService)
    {
        _scheduleService = scheduleService;
    }

    [HttpPost]
    public async Task<ActionResult> AddSchedule([FromBody] ScheduleModel scheduleModel)
    {
        var result = await _scheduleService.AddSchedule(scheduleModel);
        if (result.Item1)
        {
            return Ok(new { message = result.Item2, success = result.Item1 });   
        }
        return BadRequest(new { message = result.Item2, success = result.Item1});
    }
    
    [HttpPost]
    public async Task<ActionResult> UpdateSchedule([FromBody] ScheduleModel scheduleModel)
    {
        var result = await _scheduleService.UpdateSchedule(scheduleModel);
        if (result.Item1)
        {
            return Ok(new { message = result.Item1, success = result.Item2 });   
        }
        return BadRequest(new { message = result.Item1, success = result.Item2 });
    }

    [HttpGet]
    public async Task<ActionResult> GetAllSchedules()
    {
        var result = await _scheduleService.GetAllSchedules();
        if (result.Item1)
        {
            return Ok(new { message = result.Item1, success = result.Item2, data = result.Item3 });   
        }
        return BadRequest(new { message = result.Item1, success = result.Item2, data = result.Item3 });
    }

}
