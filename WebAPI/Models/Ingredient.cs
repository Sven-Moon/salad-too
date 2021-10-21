using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Data
{
  public class Ingredient
  {
    [Required]
    [Key]
    public string id { get; set; }
    [Required]
    public string name { get; set; }
    [Required]
    public List<string> itemGroups { get; set; }
    [Required]
    public string ingredientType { get; set; }
    public string img { get; set; }
  }
}
