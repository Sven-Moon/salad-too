using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Interfaces;
using System;
using System.Security.Cryptography;

namespace WebAPI.Data.Repo
{
  public class UsersRepository : IUsersRepository
  {
    private readonly DataContext dc;
    public UsersRepository(DataContext dc)
    {
      this.dc = dc;
    }

    // GET USERS (all)
    public async Task<IEnumerable<User>> GetUsersAsync()
    {
      return await dc.Users.ToListAsync();
    }
    // GET USER
    public async Task<User> GetUserAsync(string userId)
    {
      return await dc.Users.FindAsync(userId);
    }
    // POST
    public void AddUser(User user)
    {

      // (largely) REPEATED CODE (see UserRepository)
      byte[] passwordHash, passwordKey;
      // produce the hash
      using (var hmac = new HMACSHA512())
      {
        passwordKey = hmac.Key;
        passwordHash = hmac.ComputeHash(
          System.Text.Encoding.UTF8.GetBytes("pass"));
      }// store the info in a user object
      user.password = passwordHash;
      user.passwordKey = passwordKey;
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
