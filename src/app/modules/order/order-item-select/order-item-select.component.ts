import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Items } from 'src/app/models/Item';
import { openAddContact, openOwnerPick } from '../state/item/item.actions';
import { selectAddContactFlag, selectItemGroupPicked, selectItemsOfType, selectPickOwnerFlag } from '../state/item/item.selectors';

@Component({
  selector: 'app-order-item-select',
  templateUrl: './order-item-select.component.html',
  styleUrls: ['./order-item-select.component.scss']
})
export class OrderItemSelectComponent implements OnInit {
  hidePickContactFlag$: Observable<boolean>
  hideAddContactFlag$: Observable<boolean>
  items$: Observable<Items>
  itemGroup$: Observable<string>

  items = [
    {
      name: "Good-better Sandwich",
      id: "lakf;ealj",
      description: "You better get with me because I'm a deliciousness that will get all the honeys coming all over their britches and into the STREETS. Get your things out and dig inj, cause if you don't, somebody else will.",
      img: "./assets/images/desserts_type.png",
      price: "12.42"
    },
    {
      name: "Lesser Salad",
      id: "lakf;ealj",
      description: "I'm a description!",
      img: "./assets/images/profile.png",
      price: "12.42"
    },
    {
      name: "Sorta-okay Salad",
      id: "lakf;ealj",
      description: "I'm a description!",
      img: "./assets/images/profile.png",
      price: "12.42"
    },
  ]

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.hidePickContactFlag$ = this.store.select(selectPickOwnerFlag)
    this.hideAddContactFlag$ = this.store.select(selectAddContactFlag)
    this.items$ = this.store.select(selectItemsOfType)
    this.itemGroup$ = this.store.select(selectItemGroupPicked)
  }


  openOwnerPick() {
    this.store.dispatch(openOwnerPick())
  }

  openAddContact() {
    this.store.dispatch(openAddContact())
  }
}
