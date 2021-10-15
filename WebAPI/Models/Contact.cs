using System.ComponentModel.DataAnnotations;

namespace WebAPI.Data
{
  public class Contact
  {
    [Required]
    [Key]
    public string id { get; set; } // email
    [Required]
    public string name { get; set; }
    public string img { get; set; }
  }
}
