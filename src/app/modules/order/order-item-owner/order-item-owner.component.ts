import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import * as itemActions from 'src/app/modules/order/state/item/item.actions'

@Component({
  selector: 'app-order-item-owner',
  templateUrl: './order-item-owner.component.html',
  styleUrls: ['./order-item-owner.component.scss']
})
export class OrderItemOwnerComponent implements OnInit {
  itemType$: Observable<string>

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  openOwnerPick(): void {
    this.store.dispatch(itemActions.openOwnerPick())
  }

  closeOwnerPick(): void {
    this.store.dispatch(itemActions.closeOwnerPick())
  }

  closeAddContact() {
    this.store.dispatch(itemActions.closeAddContact())
  }

}
