import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StaticData } from 'src/app/models/StaticData';
import { Contact, User } from 'src/app/models/User';
import { selectUser } from 'src/app/store/auth/auth.selectors';
import { updateLastOwner } from '../state/cart/cart.actions';
import { selectLastItemOwner } from '../state/cart/cart.selectors';
import { selectItemGroupTypes } from '../state/item/item.selectors';
import { loadStaticData } from '../state/staticData/static-data.actions';
import { selectStaticDataState } from '../state/staticData/static-data.selectors';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  currentUser: Contact
  lastOwner: Contact

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    // if no lastOwner has been assigned, do so
    this.store.select(selectLastItemOwner).subscribe(lastOwner =>
      this.lastOwner = lastOwner
    )
    if (!this.lastOwner.email) {
      this.store.select(selectUser).subscribe(user =>
        this.currentUser = {
          name: user.name,
          img: user.img,
          email: user.email
        }
      )
      this.store.dispatch(updateLastOwner({ data: this.currentUser }))
    }

    // if staticData has not yet been downloaded, do so
    let staticData: StaticData
    this.store.select(selectStaticDataState).subscribe(data => staticData = data)
    if (staticData.items.length === 0) {
      this.store.dispatch(loadStaticData())
    }

  }

}
