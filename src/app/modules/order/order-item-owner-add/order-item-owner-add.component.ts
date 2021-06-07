import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeAddContact } from '../state/item/item.actions';

@Component({
  selector: 'app-order-item-owner-add',
  templateUrl: './order-item-owner-add.component.html',
  styleUrls: ['./order-item-owner-add.component.scss']
})
export class OrderItemOwnerAddComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  public closeAddContact() {
    this.store.dispatch(closeAddContact())
  }

  public addContact() {
    // TODO: add contact action -> reducer (user)
    // don't forget to update server (add * if not found =D )
  }

}
