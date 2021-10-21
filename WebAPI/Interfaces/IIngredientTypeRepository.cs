using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
  public interface IIngredientTypeRepository
  {
    Task<IEnumerable<IngredientType>> GetIngredientTypesAsync(); // GET all users
    Task<IngredientType> GetIngredientTypeAsync(string id); // GET user
    void AddIngredientType(IngredientType type);  // POST
    void DeleteIngredientType(string id); // DELETE
    Task<IngredientType> FindIngredientType(string id); // PUT
  }
}
