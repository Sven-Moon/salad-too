using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Interfaces;
using WebAPI.DTOs;

namespace WebAPI.Data.Repo
{

  public class DrinkTypeRepository : IDrinkTypeRepository
  {
    private readonly DataContext dc;
    public DrinkTypeRepository(DataContext dc)
    {
      this.dc = dc;
    }

    // GET
    public async Task<IEnumerable<DrinkType>> GetDrinkTypesAsync()
    {
      return await dc.DrinkTypes.ToListAsync();
    }
    // POST
    public void AddDrinkType(DrinkType drinkType)
    {
      dc.DrinkTypes.AddAsync(drinkType);
    }
    // DELETE
    public void DeleteDrinkType(string userId)
    {
      var user = dc.DrinkTypes.Find(userId);
      dc.DrinkTypes.Remove(user);
    }
    // PUT
    public async Task<DrinkType> FindDrinkType(string id)
    {
      return await dc.DrinkTypes.FindAsync(id);
    }

  }
}
