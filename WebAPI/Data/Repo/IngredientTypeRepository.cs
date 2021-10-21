using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Interfaces;

namespace WebAPI.Data.Repo
{
  public class IngredientTypeRepository : IIngredientTypeRepository
  {
    private readonly DataContext dc;
    public IngredientTypeRepository(DataContext dc)
    {
      this.dc = dc;
    }

    // GET
    public async Task<IEnumerable<IngredientType>> GetIngredientTypesAsync()
    {
      return await dc.IngredientTypes.ToListAsync();
    }
    // GET one
    public async Task<IngredientType> GetIngredientTypeAsync(string ingredientTypeId)
    {
      return await dc.IngredientTypes.FindAsync(ingredientTypeId);
    }
    // POST
    public void AddIngredientType(IngredientType IngredientType)
    {
      dc.IngredientTypes.AddAsync(IngredientType);
    }
    // DELETE
    public void DeleteIngredientType(string IngredientTypeId)
    {
      var IngredientType = dc.IngredientTypes.Find(IngredientTypeId);
      dc.IngredientTypes.Remove(IngredientType);
    }
    // PUT
    public async Task<IngredientType> FindIngredientType(string id)
    {
      return await dc.IngredientTypes.FindAsync(id);
    }
  }
}

