

using System.ComponentModel.DataAnnotations;

namespace WebAPI.Data
{
  public class Recipe
  {
    [Key]
    public int id { get; set; }
    public virtual Item itemId { get; set; }
    public virtual Ingredient ingredientId { get; set; }
  }
}
