using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
  public interface IIngredientRepository
  {
    Task<IEnumerable<Ingredient>> GetIngredientsAsync(); // GET all
    Task<Ingredient> GetIngredientAsync(string id); // GET one
    void AddIngredient(Ingredient type);  // POST
    void DeleteIngredient(string id); // DELETE
    Task<Ingredient> FindIngredient(string id); // PUT
  }
}
