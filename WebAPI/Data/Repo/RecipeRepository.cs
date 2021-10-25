using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Interfaces;
using System;
using System.Security.Cryptography;

namespace WebAPI.Data.Repo
{
  public class RecipeRepository : IRecipeRepository
  {
    public DataContext dc { get; }
    public RecipeRepository(DataContext dc)
    {
      this.dc = dc;
    }

    public async Task<IEnumerable<Recipe>> GetRecipesAsync()
    {
      return await dc.Recipe.ToListAsync();
    }

    public async Task<Recipe> GetRecipeAsync(string recipeId)
    {
      return await dc.Recipe.FindAsync(recipeId);
    }

    public void AddRecipe(Recipe Recipe)
    {
      throw new NotImplementedException();
    }

    public void DeleteRecipe(string id)
    {
      throw new NotImplementedException();
    }

    public Task<Recipe> FindRecipe(string id)
    {
      throw new NotImplementedException();
    }
  }
}
