import * as fromContacts from '../contacts.actions';

describe('loadContacts', () => {
  it('should return an action', () => {
    expect(fromContacts.loadContacts().type).toBe('[Contacts] Load Contacts');
  });
});
