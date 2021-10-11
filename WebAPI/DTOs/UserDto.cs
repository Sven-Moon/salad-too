using System.ComponentModel.DataAnnotations;

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
    public string contacts { get; set; }
    public string img { get; set; }
  }
}
