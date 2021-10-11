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

namespace WebAPI.Controllers
{
  [Authorize]
  public class DrinkTypesController : BaseController
  {
    private readonly IUnitOfWork uow;
    private readonly IMapper mapper;
    public DrinkTypesController(IUnitOfWork uow, IMapper mapper)
    {
      this.mapper = mapper;
      this.uow = uow;
    }

    // get drinkTypes api/drinkTypes/drinktypes
    [HttpGet("drinktypes")]
    [AllowAnonymous]
    public async Task<IActionResult> GetDrinkTypes()
    {
      var drinkTypes = await uow.DrinkTypeRepository.GetDrinkTypesAsync();
      var drinkTypesDto = mapper.Map<IEnumerable<DrinkTypeDto>>(drinkTypes);
      return Ok(drinkTypesDto);
    }

    // add drinkTypes api/drinkTypes/post
    [HttpPost("post")]
    public async Task<IActionResult> AddDrinkType(DrinkTypeDto drinkTypeDto)
    {
      var drinkType = mapper.Map<DrinkType>(drinkTypeDto);
      uow.DrinkTypeRepository.AddDrinkType(drinkType);
      await uow.SaveAsync();
      return StatusCode(201);
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteDrinkType(string id)
    {
      uow.DrinkTypeRepository.DeleteDrinkType(id);
      await uow.SaveAsync();
      return Ok(id);
    }

    // update drinkType api/drinkTypes/update
    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateDrinkType(string id, DrinkTypeDto drinkTypeDto)
    {
      // get drinkType from database

      var drinkTypeFromDb = await uow.DrinkTypeRepository.FindDrinkType(id);
      // additional auto-gen fields (eg: updatedOn)

      if (drinkTypeFromDb == null)
        return BadRequest("Update not allowed.");
      if (id != drinkTypeDto.id)
        return BadRequest("Update not allowed.");
      // throw new Exception("Some intentional error");
      mapper.Map(drinkTypeDto, drinkTypeFromDb);
      await uow.SaveAsync();
      return Ok(drinkTypeFromDb);
    }
  }
}
