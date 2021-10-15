using System.ComponentModel.DataAnnotations;
using WebAPI.Data;

namespace WebAPI.DTOs
{
  public class UserDto
  {
    [Required]
    public string id { get; set; }
    [Required]
    public string name { get; set; }
    public string phoneNumber { get; set; }
    [Required]
    public string email { get; set; }
    public Contact[] contacts { get; set; }
    public string img { get; set; }
  }
}
