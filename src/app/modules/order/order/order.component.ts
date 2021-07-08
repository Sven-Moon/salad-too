import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Contact, User } from 'src/app/models/User';
import { selectUser } from 'src/app/store/auth/auth.selectors';
import { updateLastOwner } from '../state/cart/cart.actions';
import { selectItemGroupTypes } from '../state/item/item.selectors';
import { loadStaticData } from '../state/staticData/static-data.actions';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  currentUser: Contact

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.select(selectUser).subscribe(user =>
      this.currentUser = {
        name: user.name,
        img: user.img,
        email: user.email
      }
    )
    this.store.dispatch(updateLastOwner({ data: this.currentUser }))
    this.store.dispatch(loadStaticData())

  }

}
