using System.Text.Json;
using WebAPI.Data;

namespace WebAPI.Models
{
  public class StaticData
  {
    public StaticData() { }
    public StaticData(
      Item[] items, ItemGroup[] itemGroups, Ingredient[] ingredients,
      IngredientType[] ingredientTypes, DrinkType[] drinkTypes)
    {
      Items = items;
      ItemGroups = itemGroups;
      Ingredients = ingredients;
      IngredientType = ingredientTypes;
      DrinkTypes = drinkTypes;
    }

    public Item[] Items { get; set; }
    public ItemGroup[] ItemGroups { get; set; }
    public Ingredient[] Ingredients { get; set; }
    public IngredientType[] IngredientType { get; set; }
    public DrinkType[] DrinkTypes { get; set; }

    // send the error as a JON object
    public override string ToString()
    {
      // sets the properties in camel case ... allows use of
      // standard notation for both api & client-side consumption
      var options = new JsonSerializerOptions()
      {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
      };
      return JsonSerializer.Serialize(this, options);
    }
  }
}
