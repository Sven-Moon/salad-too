using System.ComponentModel.DataAnnotations;


namespace WebAPI.Models
{
  public class DrinkType
  {
    [Required]
    public string id { get; set; }
    [Required]
    public string price { get; set; }
  }
}
