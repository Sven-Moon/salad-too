import * as fromOrders from '../orders.actions';

describe('loadOrderss', () => {
  it('should return an action', () => {
    expect(fromOrders.loadOrders().type).toBe('[Orders] Load Orders');
  });
});
