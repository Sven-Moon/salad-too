import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addContact } from 'src/app/store/auth/auth.actions';
import { closeAddContact } from '../state/item/item.actions';

@Component({
  selector: 'app-order-item-owner-add',
  templateUrl: './order-item-owner-add.component.html',
  styleUrls: ['./order-item-owner-add.component.scss']
})
export class OrderItemOwnerAddComponent implements OnInit {
  form = {
    name: null,
    email: null
  }

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  public closeAddContact() {
    this.store.dispatch(closeAddContact())
  }

  public addContact(f: NgForm) {
    this.store.dispatch(addContact({
      name: f.value.name,
      email: f.value.email,
      img: './assets/images/profile_1.png'
    }))
  }

}
