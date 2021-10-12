using System.ComponentModel.DataAnnotations;


namespace WebAPI.Models
{
  public class User
  {
    [Required]
    public string id { get; set; }
    [Required]
    public string name { get; set; }
    public string phoneNumber { get; set; }

    [Required]
    public string email { get; set; }
    public string contacts { get; set; }
    public string img { get; set; }

    [Required]
    public byte[] password { get; set; }
    public byte[] passwordKey { get; set; }
  }

  // public class Contact
  // {
  //   public string email { get; set; }
  //   public string name { get; set; }
  //   public string img { get; set; }
  //   public string selected { get; set; }
  // }
}
