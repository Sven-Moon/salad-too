using System.ComponentModel.DataAnnotations;

namespace WebAPI.Data
{
  public class Contact
  {
    [Required]
    public string email { get; set; }
    [Required]
    public string name { get; set; }
    public string img { get; set; }
    public string selected { get; set; }
  }
}
