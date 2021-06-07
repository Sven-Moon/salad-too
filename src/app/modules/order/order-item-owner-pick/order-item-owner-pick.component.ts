import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Contacts, User } from 'src/app/models/User';
import { State } from 'src/app/store/user/user.reducer';
import { selectUserState } from 'src/app/store/user/user.selectors';
import { closeOwnerPick, openAddContact, setItemOwner } from '../state/item/item.actions';

@Component({
  selector: 'app-order-item-owner-pick',
  templateUrl: './order-item-owner-pick.component.html',
  styleUrls: ['./order-item-owner-pick.component.scss']
})
export class OrderItemOwnerPickComponent implements OnInit {
  user$: Observable<State>
  // user: {
  //   id: "abc100",
  //   name: "Sven"
  // }

  contacts: Contacts = [
    {
      id: "abc111",
      name: "Jim Bob",
      phoneNumber: "978-231-1121",
      img: './assets/images/profile_1.png'
    },
    {
      id: "abc114",
      name: "James Bob",
      phoneNumber: "978-231-1121",
      img: './assets/images/profile_1.png'
    },
    {
      id: "abc115",
      name: "Jane Bob",
      phoneNumber: "978-231-1121",
      img: './assets/images/profile_1.png'
    },
  ]

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUserState)
  }

  openAddContact() {
    this.store.dispatch(openAddContact())
  }

  closeOwnerPick() {
    this.store.dispatch(closeOwnerPick())
  }

  showSignInModal() {
    // this.store.dispatch(showSignInModal())
  }

  public setItemOwner(id: string): void {
    this.store.dispatch(setItemOwner({ id }))
  }

}
