using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Interfaces;
using System;
using System.Security.Cryptography;

namespace WebAPI.Data.Repo
{
  public class ContactsRepository : IContactsRepository
  {
    private readonly DataContext dc;
    public ContactsRepository(DataContext dc)
    {
      this.dc = dc;
    }

    // GET USERS (all)
    public async Task<IEnumerable<Contact>> GetContactsAsync()
    {
      return await dc.Contacts.ToListAsync();
    }
    // GET USER
    public async Task<Contact> GetContactAsync(string contactId)
    {
      return await dc.Contacts.FindAsync(contactId);
    }
    // POST
    public void AddContact(Contact contact)
    {
      dc.Contacts.AddAsync(contact);
    }
    // DELETE
    public void DeleteContact(string contactId)
    {
      var contact = dc.Contacts.Find(contactId);
      dc.Contacts.Remove(contact);
    }
    // PUT
    public async Task<Contact> FindContact(string id)
    {
      return await dc.Contacts.FindAsync(id);
    }

  }
}
