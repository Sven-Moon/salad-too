using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Interfaces;
using System;

namespace WebAPI.Data.Repo
{
  public class UserRepository : IUserRepository
  {
    private readonly DataContext dc;
    public UserRepository(DataContext dc)
    {
      this.dc = dc;
    }

    // Authenticate
    public async Task<User> Authenticate(string name, string password)
    {
      Console.WriteLine("Name: " + name);
      Console.WriteLine("password: " + password);
      return await dc.Users.FirstOrDefaultAsync(x =>
        x.name == name &&
        x.password == password
      );
    }

    // GET
    public async Task<IEnumerable<User>> GetUsersAsync()
    {
      return await dc.Users.ToListAsync();
    }
    // POST
    public void AddUser(User user)
    {
      dc.Users.AddAsync(user);
    }
    // DELETE
    public void DeleteUser(string userId)
    {
      var user = dc.Users.Find(userId);
      dc.Users.Remove(user);
    }
    // PUT
    public async Task<User> FindUser(string id)
    {
      return await dc.Users.FindAsync(id);
    }

  }
}
