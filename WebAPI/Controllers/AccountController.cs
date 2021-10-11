using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;
using AutoMapper;
using WebAPI.DTOs;
using System;
using System.Collections.Generic;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;

namespace WebAPI.Controllers
{
  // [Authorize]
  public class AccountController : BaseController
  {
    private readonly IUnitOfWork uow;
    private readonly IMapper mapper;
    private readonly IConfiguration configuration;
    public AccountController(IUnitOfWork uow, IConfiguration configuration, IMapper mapper)
    {
      this.configuration = configuration;
      this.mapper = mapper;
      this.uow = uow;
    }

    // /api/account/login
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginReqDto loginReq)
    {
      var user = await uow.UserRepository.Authenticate(
        loginReq.name, loginReq.password
      );

      if (user == null)
      {
        return Unauthorized();
      }

      var loginRes = new LoginResDto();
      loginRes.name = user.name;
      loginRes.Token = CreateJWT(user);
      return Ok(loginRes);
    }

    private string CreateJWT(User user)
    {
      var secretKey = configuration.GetSection("AppSettings:Key").Value;
      var key = new SymmetricSecurityKey(Encoding.UTF8
        .GetBytes(secretKey));
      var claims = new Claim[] {
        new Claim(ClaimTypes.Name, user.name),
        new Claim(ClaimTypes.NameIdentifier, user.id.ToString())
      };
      var signingCredentials = new SigningCredentials(
        key, SecurityAlgorithms.HmacSha256Signature);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.UtcNow.AddDays(10),
        SigningCredentials = signingCredentials
      };
      var tokenHandler = new JwtSecurityTokenHandler();
      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }

    // get users api/account/users
    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
      var users = await uow.UserRepository.GetUsersAsync();
      var usersDto = mapper.Map<IEnumerable<UserDto>>(users);
      return Ok(usersDto);
    }

    // add users api/account/post
    [HttpPost("post")]
    public async Task<IActionResult> PostUser(UserDto userDto)
    {
      var user = mapper.Map<User>(userDto);
      // ToDo: remove default
      user.password = "string";
      uow.UserRepository.AddUser(user);
      await uow.SaveAsync();
      return StatusCode(201);
    }

    // add users api/account/delete/{id}
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
      uow.UserRepository.DeleteUser(id);
      await uow.SaveAsync();
      return Ok(id);
    }

    // update user api/account/update/{id}
    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateUser(string id, UserDto userDto)
    {
      // get user from database

      var userFromDb = await uow.UserRepository.FindUser(id);
      // additional auto-gen fields (eg: updatedOn)

      if (userFromDb == null)
        return BadRequest("Update not allowed.");
      if (id != userDto.id)
        return BadRequest("Update not allowed.");
      // throw new Exception("Some intentional error");
      mapper.Map(userDto, userFromDb);
      await uow.SaveAsync();
      return Ok(userFromDb);
    }
  }
}
