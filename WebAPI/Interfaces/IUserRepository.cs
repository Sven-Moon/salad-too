using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
  public interface IUserRepository
  {
    Task<User> Authenticate(string userName, string password);
    void Register(string userName, string email, string password);
    Task<bool> UserAlreadyExists(string userName);
    Task<IEnumerable<User>> GetUsersAsync(); // GET
    void AddUser(User user);  // POST
    void DeleteUser(string id); // DELETE
    Task<User> FindUser(string id); // PUT
  }
}
