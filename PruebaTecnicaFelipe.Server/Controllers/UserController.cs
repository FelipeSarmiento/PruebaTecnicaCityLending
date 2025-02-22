using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaFelipe.Server.Context;
using PruebaTecnicaFelipe.Server.Models;

namespace PruebaTecnicaFelipe.Server.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<ActionResult> DeleteUser(int idUser)
    {
        var result = await _userService.DeleteUser(idUser);
        if (result.Item1)
        {
            return Ok(new { message = result.Item1, success = result.Item2 });   
        }
        return BadRequest(new { message = result.Item1, success = result.Item2});
    }

    [HttpPost]
    public async Task<ActionResult> AddUser([FromBody] UserModel user)
    {
        var result = await _userService.AddUser(user);
        if (result.Item1)
        {
            return Ok(new { message = result.Item2, success = result.Item1 });   
        }
        return BadRequest(new { message = result.Item2, success = result.Item1});
    }
    
    [HttpPost]
    public async Task<ActionResult> UpdateUser([FromBody] UserModel user)
    {
        var result = await _userService.UpdateUser(user);
        if (result.Item1)
        {
            return Ok(new { message = result.Item1, success = result.Item2 });   
        }
        return BadRequest(new { message = result.Item1, success = result.Item2 });
    }

    [HttpGet]
    public async Task<ActionResult> GetAllUsers()
    {
        var result = await _userService.GetAllUsers();
        if (result.Item1)
        {
            return Ok(new { message = result.Item1, success = result.Item2, data = result.Item3 });   
        }
        return BadRequest(new { message = result.Item1, success = result.Item2, data = result.Item3 });
    }

    [HttpGet]
    public async Task<ActionResult> GetUser(int idUser)
    {
        var result = await _userService.GetUser(idUser);
        if (result.Item1)
        {
            return Ok(new { message = result.Item1, success = result.Item2, data = result.Item3 });   
        }
        return BadRequest(new { message = result.Item1, success = result.Item2, data = result.Item3 });
    }
    [HttpPost]
    public async Task<ActionResult> GetUser([FromBody] UserModel user)
    {
        var result = await _userService.GetUser(user);
        if (result.Item1)
        {
            return Ok(new { message = result.Item2, success = result.Item1, data = result.Item3 });   
        }
        return BadRequest(new { message = result.Item2, success = result.Item1, data = result.Item3 });
    }
    
    [HttpGet]
    public async Task<ActionResult<PagedResponse<UserModel>>> GetUsersPaged(
        [FromQuery] int pageNumber = 1, 
        [FromQuery] int pageSize = 10)
    {
        
        if (pageNumber < 1 || pageSize < 1)
        {
            return BadRequest("pageNumber y pageSize deben ser mayores que 0.");
        }
        var result = await _userService.GetUsersPaged(pageNumber, pageSize);

        if (result.Item1)
        {
            var response = new PagedResponse<UserModel>
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
            return BadRequest(new { message = result.Item2, success = false, data = new {} });
        }
    }
}
