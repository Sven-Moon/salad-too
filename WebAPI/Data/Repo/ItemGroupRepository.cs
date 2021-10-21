using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Interfaces;

namespace WebAPI.Data.Repo
{
  public class ItemGroupRepository : IItemGroupRepository
  {
    private readonly DataContext dc;
    public ItemGroupRepository(DataContext dc)
    {
      this.dc = dc;
    }

    // GET
    public async Task<IEnumerable<ItemGroup>> GetItemGroupsAsync()
    {
      return await dc.ItemGroups.ToListAsync();
    }
    // GET one
    public async Task<ItemGroup> GetItemGroupAsync(string id)
    {
      return await dc.ItemGroups.FindAsync(id);
    }
    // POST
    public void AddItemGroup(ItemGroup ItemGroup)
    {
      dc.ItemGroups.AddAsync(ItemGroup);
    }
    // DELETE
    public void DeleteItemGroup(string userId)
    {
      var user = dc.ItemGroups.Find(userId);
      dc.ItemGroups.Remove(user);
    }
    // PUT
    public async Task<ItemGroup> FindItemGroup(string id)
    {
      return await dc.ItemGroups.FindAsync(id);
    }
  }
}
