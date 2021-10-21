using System.ComponentModel.DataAnnotations;

namespace WebAPI.Data
{
  public class IngredientType
  {
    [Required]
    [Key]
    public string id { get; set; }
    [Required]
    public string name { get; set; }
    [Required]
    public string selectType { get; set; }
    [Required]
    public string price { get; set; }
    public string img { get; set; }
  }
}
