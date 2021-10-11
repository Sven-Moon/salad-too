using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
  public interface IDrinkTypeRepository
  {
    Task<IEnumerable<DrinkType>> GetDrinkTypesAsync(); // GET
    void AddDrinkType(DrinkType drinkType);  // POST
    void DeleteDrinkType(string id); // DELETE
    Task<DrinkType> FindDrinkType(string id); // PUT
  }
}
