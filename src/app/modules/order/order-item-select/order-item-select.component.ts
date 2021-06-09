import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item, Items } from 'src/app/models/Item';
import { clearItemGroup, loadItem, openAddContact, openOwnerPick, setItemId } from '../state/item/item.actions';
import { selectAddContactFlag, selectItemGroupPicked, selectItemsOfGroup, selectItemsWithPrice, selectPickedItemProperties, selectPickOwnerFlag } from '../state/item/item.selectors';

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
      description: "You better get with me because I'm a deliciousness that will get all the honeys kids screaming, 'GIMME! GIMME! I WANT! I WANT!' in the STREETS. Get your sporks out and dig in, cause if you don't, somebody else will.",
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
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.hidePickContactFlag$ = this.store.select(selectPickOwnerFlag)
    this.hideAddContactFlag$ = this.store.select(selectAddContactFlag)
    this.items$ = this.store.select(selectItemsWithPrice)
    this.itemGroup$ = this.store.select(selectItemGroupPicked)
  }


  public openOwnerPick() {
    this.store.dispatch(openOwnerPick())
  }

  public openAddContact() {
    this.store.dispatch(openAddContact())
  }

  public back() {
    this.store.dispatch(clearItemGroup())
  }

  public setAsItem(id: string) {
    this.store.dispatch(setItemId({ id }))
    this.store.select(selectPickedItemProperties).subscribe(
      item => this.store.dispatch(loadItem({ item }))
    )

    this.itemGroup$.subscribe(group => {
      if (group === 'salad' || group === 'sandwich') {
        this.router.navigate(['/order/customize'])
      } else {
        this.router.navigate(['/order/cart'])
      }
    })
  }

}
