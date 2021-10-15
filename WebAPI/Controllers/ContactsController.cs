using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;
using AutoMapper;
using WebAPI.DTOs;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using WebAPI.Data;

namespace WebAPI.Controllers
{
  [Authorize]
  public class ContactsController : BaseController
  {
    private readonly IUnitOfWork uow;
    private readonly IMapper mapper;
    private readonly IConfiguration configuration;
    public ContactsController(IUnitOfWork uow, IConfiguration configuration)
    {
      this.configuration = configuration;
      this.uow = uow;
    }

    // get contacts api/contacts/contacts
    [HttpGet("get-all")]
    public async Task<IActionResult> GetContacts()
    {
      var contacts = await uow.ContactsRepository.GetContactsAsync();
      return Ok(contacts);
    }
    // get contacts api/contacts/contacts
    [HttpGet("{id}")]
    public async Task<IActionResult> GetContact()
    {
      var contacts = await uow.ContactsRepository.GetContactsAsync();
      return Ok(contacts);
    }

    // add contacts api/contacts/post
    [HttpPost("post")]
    public async Task<IActionResult> PostContact(Contact contact)
    {
      uow.ContactsRepository.AddContact(contact);
      await uow.SaveAsync();
      return StatusCode(201);
    }

    // add contacts api/contacts/delete/{id}
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteContact(string id)
    {
      uow.ContactsRepository.DeleteContact(id);
      await uow.SaveAsync();
      return Ok(id);
    }

    // update contact api/contacts/update/{id}
    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateContact(string id, Contact contact)
    {
      // get contact from database

      var contactFromDb = await uow.ContactsRepository.FindContact(id);
      // additional auto-gen fields (eg: updatedOn)

      if (contactFromDb == null)
        return BadRequest("Update not allowed.");
      if (id != contact.id)
        return BadRequest("Update not allowed.");

      contactFromDb.name = contact.name;
      contactFromDb.img = contact.img;

      await uow.SaveAsync();
      return Ok(contactFromDb);
    }
  }
}
