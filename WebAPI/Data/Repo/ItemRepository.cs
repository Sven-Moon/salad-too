using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Interfaces;

namespace WebAPI.Data.Repo
{
  public class ItemRepository : IItemRepository
  {
    private readonly DataContext dc;
    public ItemRepository(DataContext dc)
    {
      this.dc = dc;
    }

    // GET
    public async Task<IEnumerable<Item>> GetItemsAsync()
    {
      return await dc.Items.ToListAsync();
    }
    // GET one
    public async Task<Item> GetItemAsync(string id)
    {
      return await dc.Items.FindAsync(id);
    }
    // POST
    public void AddItem(Item Item)
    {
      dc.Items.AddAsync(Item);
    }
    // DELETE
    public void DeleteItem(string userId)
    {
      var user = dc.Items.Find(userId);
      dc.Items.Remove(user);
    }
    // PUT
    public async Task<Item> FindItem(string id)
    {
      return await dc.Items.FindAsync(id);
    }
  }
}
