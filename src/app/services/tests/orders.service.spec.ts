import { TestBed } from '@angular/core/testing';

import { OrdersService } from '../orders.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  // ****************
  // (1) take an order id (string)
  // (2) after some seconds, change to Making
  // (3) after some seconds, change to Ready
  // (4) after some seconds, change to Delivered
  // 2-4 utilize a faked store
  // -- deliver an object to the store

});
