using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
  public interface IItemGroupRepository
  {
    Task<IEnumerable<ItemGroup>> GetItemGroupsAsync(); // GET all
    Task<ItemGroup> GetItemGroupAsync(string id); // GET one
    void AddItemGroup(ItemGroup type);  // POST
    void DeleteItemGroup(string id); // DELETE
    Task<ItemGroup> FindItemGroup(string id); // PUT
  }
}
