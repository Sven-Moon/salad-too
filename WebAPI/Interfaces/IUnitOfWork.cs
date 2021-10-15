using System.Threading.Tasks;

namespace WebAPI.Interfaces
{
  public interface IUnitOfWork
  {
    IUserRepository UserRepository { get; }
    IUsersRepository UsersRepository { get; }
    IDrinkTypeRepository DrinkTypeRepository { get; }
    IContactsRepository ContactsRepository { get; }
    Task<bool> SaveAsync();
  }
}
