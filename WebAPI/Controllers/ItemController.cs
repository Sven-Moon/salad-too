using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Data;

namespace WebAPI.Controllers
{
  [Authorize]
  public class ItemsController : BaseController
  {
    private readonly IUnitOfWork uow;
    public ItemsController(IUnitOfWork uow, IMapper mapper)
    {
      this.uow = uow;
    }

    // get Items api/Items/drinktypes
    [HttpGet()]
    [AllowAnonymous]
    public async Task<IActionResult> GetItem()
    {
      var data = await uow.ItemRepository.GetItemsAsync();
      return Ok(data);
    }

    // add Items api/Items/post
    [HttpPost("post")]
    public async Task<IActionResult> AddItem(Item Item)
    {
      uow.ItemRepository.AddItem(Item);
      await uow.SaveAsync();
      return StatusCode(201);
    }

    [HttpDelete("delete/{itemId}")]
    public async Task<IActionResult> DeleteItem(string itemId)
    {
      uow.ItemRepository.DeleteItem(itemId);
      await uow.SaveAsync();
      return Ok(itemId);
    }

    // update Item api/Items/update
    [HttpPut("update/{itemId}")]
    public async Task<IActionResult> UpdateItem(string itemId, Item Item)
    {
      // get Item from database

      var ItemFromDb = await uow.ItemRepository.FindItem(itemId);

      if (ItemFromDb == null)
        return BadRequest("Update not allowed.");
      if (itemId != Item.id)
        return BadRequest("Update not allowed.");
      // throw new Exception("Some intentional error");
      await uow.SaveAsync();
      return Ok(ItemFromDb);
    }
  }
}
