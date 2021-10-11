using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
  public class Payment
  {
    [Required]
    public int id { get; set; }

    [Required]
    public int amount { get; set; }

    [Required]
    public string name { get; set; }

    [Required]
    [Range(16, 20)]
    public string ccNum { get; set; }

    [Required]
    public string exp { get; set; }

    [Required]

    [StringLength(3)]
    public string ccv { get; set; }
  }
}
