using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
  public interface IContactsRepository
  {
    Task<IEnumerable<Contact>> GetContactsAsync(); // GET all users
    Task<Contact> GetContactAsync(string userId); // GET user
    void AddContact(Contact user);  // POST
    void DeleteContact(string id); // DELETE
    Task<Contact> FindContact(string id); // PUT
  }
}
