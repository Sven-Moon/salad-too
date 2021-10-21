using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data
{

  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    { }
    public DbSet<User> Users { get; set; }
    public DbSet<DrinkType> DrinkTypes { get; set; }
    public DbSet<Contact> Contacts { get; set; }
    public DbSet<ContactList> ContactLists { get; set; }
    public DbSet<IngredientType> IngredientTypes { get; set; }
    public DbSet<Ingredient> Ingredients { get; set; }
    public DbSet<ItemGroup> ItemGroups { get; set; }
    public DbSet<Item> Items { get; set; }

  }
}
