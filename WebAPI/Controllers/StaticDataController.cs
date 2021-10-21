using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using WebAPI.Data;
using System.Linq;

namespace WebAPI.Controllers
{
  public class StaticDataController : BaseController
  {
    private readonly IUnitOfWork uow;
    private readonly IMapper mapper;
    private readonly IConfiguration configuration;
    public StaticDataController(IUnitOfWork uow, IConfiguration configuration)
    {
      this.configuration = configuration;
      this.uow = uow;
    }

    // get StaticData api/StaticData
    [HttpGet()]
    public async Task<IActionResult> GetStaticData()
    {
      var vitems = await uow.ItemRepository
        .GetItemsAsync();
      var vitemsGroups = await uow.ItemGroupRepository
        .GetItemGroupsAsync();
      var vingredients = await uow.IngredientRepository
        .GetIngredientsAsync();
      var vingredientTypes = await uow.IngredientTypeRepository
        .GetIngredientTypesAsync();
      var vdrinkTypes = await uow.DrinkTypeRepository
        .GetDrinkTypesAsync();


      Item[] items = vitems.Cast<Item>().ToArray();
      ItemGroup[] itemGroups = vitemsGroups.Cast<ItemGroup>().ToArray();
      Ingredient[] ingredients = vingredients.Cast<Ingredient>().ToArray();
      IngredientType[] ingredientTypes = vingredientTypes.Cast<IngredientType>().ToArray();
      DrinkType[] drinkTypes = vdrinkTypes.Cast<DrinkType>().ToArray();

      var staticData = new StaticData(
        items, itemGroups, ingredients, ingredientTypes, drinkTypes);

      return Ok(staticData);
    }

  }
}
