import * as fromOwner from '../owner.actions';

describe('loadOwners', () => {
  it('should return an action', () => {
    expect(fromOwner.loadOwners().type).toBe('[Owner] Load Owners');
  });
});
