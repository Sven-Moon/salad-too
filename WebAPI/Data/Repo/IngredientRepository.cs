using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Interfaces;

namespace WebAPI.Data.Repo
{
  public class IngredientRepository : IIngredientRepository
  {
    private readonly DataContext dc;
    public IngredientRepository(DataContext dc)
    {
      this.dc = dc;
    }

    // GET all
    public async Task<IEnumerable<Ingredient>> GetIngredientsAsync()
    {
      return await dc.Ingredients.ToListAsync();
    }
    // GET one
    public async Task<Ingredient> GetIngredientAsync(string ingredientId)
    {
      return await dc.Ingredients.FindAsync(ingredientId);
    }
    // POST
    public void AddIngredient(Ingredient Ingredient)
    {
      dc.Ingredients.AddAsync(Ingredient);
    }
    // DELETE
    public void DeleteIngredient(string id)
    {
      var ingredient = dc.Ingredients.Find(id);
      dc.Ingredients.Remove(ingredient);
    }
    // PUT
    public async Task<Ingredient> FindIngredient(string id)
    {
      return await dc.Ingredients.FindAsync(id);
    }
  }
}
