using System.Threading.Tasks;
using WebAPI.Data.Repo;
using WebAPI.Interfaces;

namespace WebAPI.Data
{
  public class UnitOfWork : IUnitOfWork
  {
    public readonly DataContext dc;
    public UnitOfWork(DataContext dc)
    {
      this.dc = dc;
    }
    public IUserRepository UserRepository =>
      new UserRepository(dc);
    public IUsersRepository UsersRepository =>
      new UsersRepository(dc);
    public IDrinkTypeRepository DrinkTypeRepository =>
      new DrinkTypeRepository(dc);
    public IContactsRepository ContactsRepository =>
      new ContactsRepository(dc);
    public IIngredientTypeRepository IngredientTypeRepository =>
      new IngredientTypeRepository(dc);
    public IIngredientRepository IngredientRepository =>
      new IngredientRepository(dc);
    public IItemGroupRepository ItemGroupRepository =>
      new ItemGroupRepository(dc);
    public IItemRepository ItemRepository =>
      new ItemRepository(dc);
    public IItemRepository ReceipeRepository =>
      new ItemRepository(dc);

    public async Task<bool> SaveAsync()
    {
      return await dc.SaveChangesAsync() > 0;
    }
  }
}
