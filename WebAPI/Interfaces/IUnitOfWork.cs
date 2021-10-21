using System.Threading.Tasks;

namespace WebAPI.Interfaces
{
  public interface IUnitOfWork
  {
    IUserRepository UserRepository { get; }
    IUsersRepository UsersRepository { get; }
    IDrinkTypeRepository DrinkTypeRepository { get; }
    IContactsRepository ContactsRepository { get; }
    IIngredientTypeRepository IngredientTypeRepository { get; }
    IIngredientRepository IngredientRepository { get; }
    IItemGroupRepository ItemGroupRepository { get; }
    IItemRepository ItemRepository { get; }
    Task<bool> SaveAsync();
  }
}
