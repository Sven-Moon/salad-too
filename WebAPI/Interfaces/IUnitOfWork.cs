using System.Threading.Tasks;

namespace WebAPI.Interfaces
{
  public interface IUnitOfWork
  {
    IUserRepository UserRepository { get; }
    IDrinkTypeRepository DrinkTypeRepository { get; }
    Task<bool> SaveAsync();
  }
}
