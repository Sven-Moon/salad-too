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

    public async Task<bool> SaveAsync()
    {
      return await dc.SaveChangesAsync() > 0;
    }
  }
}
