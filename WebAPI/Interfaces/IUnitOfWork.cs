using System.Threading.Tasks;

namespace WebAPI.Interfaces
{
  public interface IUnitOfWork
  {
    IUserRepository UserRepository { get; }
    IUsersRepository UsersRepository { get; }
    IDrinkTypeRepository DrinkTypeRepository { get; }
    Task<bool> SaveAsync();
  }
}
