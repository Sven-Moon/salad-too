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
        loginReq.email, loginReq.password
      );

      if (user == null)
      {
        return Unauthorized();
      }

      var loginRes = new LoginResDto();
      loginRes.Token = CreateJWT(user);
      loginRes.id = user.name;
      loginRes.name = user.name;
      loginRes.email = user.email;
      loginRes.phoneNumber = user.phoneNumber;
      loginRes.img = user.img;
      return Ok(loginRes);
    }


    // /api/account/register
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterReqDto regReq)
    {
      if (await uow.UserRepository.UserAlreadyExists(regReq.name))
        return BadRequest("User already exists");

      uow.UserRepository.Register(regReq.name, regReq.email, regReq.password);
      await uow.SaveAsync();
      var LoginResDto = await uow.UsersRepository.FindUser(regReq.email);
      return Ok(LoginResDto);
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
  }
}
