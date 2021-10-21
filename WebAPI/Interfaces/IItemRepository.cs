using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
  public interface IItemRepository
  {
    Task<IEnumerable<Item>> GetItemsAsync(); // GET all
    Task<Item> GetItemAsync(string id); // GET one
    void AddItem(Item type);  // POST
    void DeleteItem(string id); // DELETE
    Task<Item> FindItem(string id); // PUT
  }
}
