using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Models;

namespace WebAPI.Data
{
  public class ContactList
  {
    [Key]
    [ForeignKey("User")]
    public string UserId { get; set; }
    public User User { get; set; }
    [Required]
    [ForeignKey("Contact")]
    public string ContactId { get; set; }
    public Contact Contact { get; set; }
  }
}
