using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WebAPI.Data;


namespace WebAPI.Models
{
  public class User
  {
    [Required]
    [MinLength(3)]
    public string id { get; set; }
    [Required]
    [MinLength(3)]
    public string name { get; set; }
    [Required]
    public string email { get; set; }
    public string phoneNumber { get; set; }
    public string img { get; set; }
    [Required]
    public byte[] password { get; set; }
    public byte[] passwordKey { get; set; }
  }

  public class UserLogin
  {
    [Required]
    public string email { get; set; }
    [Required]
    public string password { get; set; }
  }
  public class UserRegister
  {
    [Required]
    public string email { get; set; }
    [Required]
    public string name { get; set; }
    [Required]
    public string password { get; set; }
  }
}
