using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Data;

namespace WebAPI.Controllers
{
  [Authorize]
  public class IngredientTypesController : BaseController
  {
    private readonly IUnitOfWork uow;
    public IngredientTypesController(IUnitOfWork uow, IMapper mapper)
    {
      this.uow = uow;
    }

    // get IngredientTypes api/IngredientTypes/drinktypes
    [HttpGet()]
    [AllowAnonymous]
    public async Task<IActionResult> GetIngredientType()
    {
      var data = await uow.IngredientTypeRepository.GetIngredientTypesAsync();
      return Ok(data);
    }

    // add IngredientTypes api/IngredientTypes/post
    [HttpPost("post")]
    public async Task<IActionResult> AddIngredientType(IngredientType IngredientType)
    {
      uow.IngredientTypeRepository.AddIngredientType(IngredientType);
      await uow.SaveAsync();
      return StatusCode(201);
    }

    [HttpDelete("delete/{ingredientTypeId}")]
    public async Task<IActionResult> DeleteIngredientType(string ingredientTypeId)
    {
      uow.IngredientTypeRepository.DeleteIngredientType(ingredientTypeId);
      await uow.SaveAsync();
      return Ok(ingredientTypeId);
    }

    // update IngredientType api/IngredientTypes/update
    [HttpPut("update/{ingredientTypeId}")]
    public async Task<IActionResult> UpdateIngredientType(string ingredientTypeId, IngredientType IngredientType)
    {
      // get IngredientType from database

      var IngredientTypeFromDb = await uow.IngredientTypeRepository.FindIngredientType(ingredientTypeId);

      if (IngredientTypeFromDb == null)
        return BadRequest("Update not allowed.");
      if (ingredientTypeId != IngredientType.id)
        return BadRequest("Update not allowed.");
      // throw new Exception("Some intentional error");
      await uow.SaveAsync();
      return Ok(IngredientTypeFromDb);
    }
  }
}
