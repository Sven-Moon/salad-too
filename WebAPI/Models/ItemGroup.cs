using System.ComponentModel.DataAnnotations;

namespace WebAPI.Data
{
  public class ItemGroup
  {
    [Required]
    [Key]
    public string id { get; set; }
    [Required]
    public string name { get; set; }
    public string img { get; set; }
  }
}
