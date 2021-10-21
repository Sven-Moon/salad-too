using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Data;

namespace WebAPI.Controllers
{
  [Authorize]
  public class IngredientsController : BaseController
  {
    private readonly IUnitOfWork uow;
    public IngredientsController(IUnitOfWork uow, IMapper mapper)
    {
      this.uow = uow;
    }

    // get Ingredients api/Ingredients/drinktypes
    [HttpGet()]
    [AllowAnonymous]
    public async Task<IActionResult> GetIngredient()
    {
      var data = await uow.IngredientRepository.GetIngredientsAsync();
      return Ok(data);
    }

    // add Ingredients api/Ingredients/post
    [HttpPost("post")]
    public async Task<IActionResult> AddIngredient(Ingredient Ingredient)
    {
      uow.IngredientRepository.AddIngredient(Ingredient);
      await uow.SaveAsync();
      return StatusCode(201);
    }

    [HttpDelete("delete/{ingredientId}")]
    public async Task<IActionResult> DeleteIngredient(string ingredientId)
    {
      uow.IngredientRepository.DeleteIngredient(ingredientId);
      await uow.SaveAsync();
      return Ok(ingredientId);
    }

    // update Ingredient api/Ingredients/update
    [HttpPut("update/{ingredientId}")]
    public async Task<IActionResult> UpdateIngredient(string ingredientId, Ingredient Ingredient)
    {
      // get Ingredient from database

      var IngredientFromDb = await uow.IngredientRepository.FindIngredient(ingredientId);

      if (IngredientFromDb == null)
        return BadRequest("Update not allowed.");
      if (ingredientId != Ingredient.id)
        return BadRequest("Update not allowed.");
      // throw new Exception("Some intentional error");
      await uow.SaveAsync();
      return Ok(IngredientFromDb);
    }
  }
}
