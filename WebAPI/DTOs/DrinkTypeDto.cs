using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
  public class DrinkTypeDto
  {
    [Required]
    public string id { get; set; }
    [Required]
    public string price { get; set; }
    // public string password { get; set; }
  }
}
