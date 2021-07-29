import * as fromOrders from '../orders.actions';

describe('loadOrderss', () => {
  it('should return an action', () => {
    expect(fromOrders.loadOrderss().type).toBe('[Orders] Load Orderss');
  });
});
