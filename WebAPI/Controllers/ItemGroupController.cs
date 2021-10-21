using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Data;

namespace WebAPI.Controllers
{
  [Authorize]
  public class ItemGroupsController : BaseController
  {
    private readonly IUnitOfWork uow;
    public ItemGroupsController(IUnitOfWork uow, IMapper mapper)
    {
      this.uow = uow;
    }

    // get itemGroups api/itemGroups/drinktypes
    [HttpGet()]
    [AllowAnonymous]
    public async Task<IActionResult> GetItemGroup()
    {
      var data = await uow.ItemGroupRepository.GetItemGroupsAsync();
      return Ok(data);
    }

    // add itemGroups api/itemGroups/post
    [HttpPost("post")]
    public async Task<IActionResult> AddItemGroup(ItemGroup itemGroup)
    {
      uow.ItemGroupRepository.AddItemGroup(itemGroup);
      await uow.SaveAsync();
      return StatusCode(201);
    }

    [HttpDelete("delete/{itemGroupId}")]
    public async Task<IActionResult> DeleteItemGroup(string itemGroupId)
    {
      uow.ItemGroupRepository.DeleteItemGroup(itemGroupId);
      await uow.SaveAsync();
      return Ok(itemGroupId);
    }

    // update itemGroup api/itemGroups/update
    [HttpPut("update/{itemGroupId}")]
    public async Task<IActionResult> UpdateItemGroup(string itemGroupId, ItemGroup itemGroup)
    {
      // get itemGroup from database

      var itemGroupFromDb = await uow.ItemGroupRepository.FindItemGroup(itemGroupId);

      if (itemGroupFromDb == null)
        return BadRequest("Update not allowed.");
      if (itemGroupId != itemGroup.id)
        return BadRequest("Update not allowed.");
      // throw new Exception("Some intentional error");
      await uow.SaveAsync();
      return Ok(itemGroupFromDb);
    }
  }
}
