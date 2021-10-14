using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
  public interface IUsersRepository
  {
    Task<IEnumerable<User>> GetUsersAsync(); // GET all users
    Task<User> GetUserAsync(string userId); // GET user
    void AddUser(User user);  // POST
    void DeleteUser(string id); // DELETE
    Task<User> FindUser(string id); // PUT
  }
}
