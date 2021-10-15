using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;
using AutoMapper;
using WebAPI.DTOs;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;

namespace WebAPI.Controllers
{
  [Authorize]
  public class UsersController : BaseController
  {
    private readonly IUnitOfWork uow;
    private readonly IMapper mapper;
    private readonly IConfiguration configuration;
    public UsersController(IUnitOfWork uow, IConfiguration configuration, IMapper mapper)
    {
      this.configuration = configuration;
      this.mapper = mapper;
      this.uow = uow;
    }

    // get users api/users/users
    [HttpGet("get-all")]
    public async Task<IActionResult> GetUsers()
    {
      var users = await uow.UsersRepository.GetUsersAsync();
      var usersDto = mapper.Map<IEnumerable<UserDto>>(users);
      return Ok(usersDto);
    }
    // get users api/users/users
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser()
    {
      var users = await uow.UsersRepository.GetUsersAsync();
      var usersDto = mapper.Map<IEnumerable<UserDto>>(users);
      return Ok(usersDto);
    }

    // add users api/users/post
    [HttpPost("post")]
    public async Task<IActionResult> PostUser(UserDto userDto)
    {
      var user = mapper.Map<User>(userDto);
      uow.UsersRepository.AddUser(user);
      await uow.SaveAsync();
      return StatusCode(201);
    }

    // add users api/users/delete/{id}
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
      uow.UsersRepository.DeleteUser(id);
      await uow.SaveAsync();
      return Ok(id);
    }

    // update user api/users/update/{id}
    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateUser(string id, UserDto userDto)
    {
      // get user from database

      var userFromDb = await uow.UsersRepository.FindUser(id);
      // additional auto-gen fields (eg: updatedOn)

      if (userFromDb == null)
        return BadRequest("Update not allowed.");
      if (id != userDto.id)
        return BadRequest("Update not allowed.");

      userFromDb.name = userDto.name;
      userFromDb.email = userDto.email;
      userFromDb.img = userDto.img;
      userFromDb.phoneNumber = userDto.phoneNumber;

      mapper.Map(userDto, userFromDb);
      await uow.SaveAsync();
      return Ok(userFromDb);
    }
  }
}
