using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
  public interface IRecipeRepository
  {
    Task<IEnumerable<Recipe>> GetRecipesAsync(); // GET all Recipe
    Task<Recipe> GetRecipeAsync(string RecipeId); // GET Recipe
    void AddRecipe(Recipe Recipe);  // POST
    void DeleteRecipe(string id); // DELETE
    Task<Recipe> FindRecipe(string id); // PUT
  }
}
