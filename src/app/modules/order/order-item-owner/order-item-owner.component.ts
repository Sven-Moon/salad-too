import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/User';
import * as itemActions from 'src/app/modules/order/state/item/item.actions'
import { selectUserState } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-order-item-owner',
  templateUrl: './order-item-owner.component.html',
  styleUrls: ['./order-item-owner.component.scss']
})
export class OrderItemOwnerComponent implements OnInit {
  itemType$: Observable<string>
  user$: Observable<User>

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUserState)
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
