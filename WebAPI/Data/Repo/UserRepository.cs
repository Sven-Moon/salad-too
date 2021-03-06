using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Interfaces;
using System;
using System.Security.Cryptography;

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
    public async Task<User> Authenticate(string email, string passwordText)
    {
      var user = await dc.Users.FirstOrDefaultAsync(x => x.email == email);

      if (user == null || user.passwordKey == null)
        return null;

      if (!MatchPasswordHash(passwordText, user.password, user.passwordKey))
        return null;

      return user;
    }
    public bool MatchPasswordHash(string passwordText, byte[] password, byte[] passwordKey)
    {
      // produce the hash
      using (var hmac = new HMACSHA512(passwordKey))
      {
        var passwordHash = hmac.ComputeHash(
          System.Text.Encoding.UTF8.GetBytes(passwordText));

        for (int i = 0; i < passwordHash.Length; i++)
        {
          if (passwordHash[i] != password[i])
            return false;
        }

        return true;
      }
    }

    // Register
    public void Register(string name, string email, string password)
    {
      byte[] passwordHash, passwordKey;

      // produce the hash
      using (var hmac = new HMACSHA512())
      {
        passwordKey = hmac.Key;
        passwordHash = hmac.ComputeHash(
          System.Text.Encoding.UTF8.GetBytes(password));
      }

      // store the info in a user object
      User user = new User();
      user.name = name;
      user.id = email;
      user.email = email;
      user.password = passwordHash;
      user.passwordKey = passwordKey;

      // add to the database
      dc.Users.Add(user);
    }

    // User Already Exists
    public async Task<bool> UserAlreadyExists(string name)
    {
      return await dc.Users.AnyAsync(x => x.name == name);
    }

  }
}
