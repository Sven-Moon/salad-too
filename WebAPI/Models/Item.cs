using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Data
{
  public class Item
  {
    [Required]
    [Key]
    public string id { get; set; }
    [Required]
    public string name { get; set; }
    public string img { get; set; }
    public List<string> ingredients { get; set; }
    [Required]
    public string itemGroup { get; set; }
    public string description { get; set; }
  }
}
