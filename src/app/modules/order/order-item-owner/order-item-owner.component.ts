import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Contact, User } from 'src/app/models/User';
import * as itemActions from 'src/app/modules/order/state/item/item.actions'
import { selectUser } from 'src/app/store/auth/auth.selectors';
import { selectItemOwner } from '../state/item/item.selectors';

@Component({
  selector: 'app-order-item-owner',
  templateUrl: './order-item-owner.component.html',
  styleUrls: ['./order-item-owner.component.scss']
})
export class OrderItemOwnerComponent implements OnInit {
  itemGroup$: Observable<string>
  user$: Observable<User>
  owner$: Observable<Contact>

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser)
    this.owner$ = this.store.select(selectItemOwner)
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
