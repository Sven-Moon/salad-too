import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem, Item, Items } from 'src/app/models/Item';
import { Contact } from 'src/app/models/User';
import { addItemToCart } from '../state/cart/cart.actions';
import { selectLastItemOwner } from '../state/cart/cart.selectors';
import { clearItemGroup, loadItem, setItemId } from '../state/item/item.actions';
import { selectItemGroupPicked, selectItemsWithPrice, selectPickedItem } from '../state/item/item.selectors';

@Component({
  selector: 'app-order-item-select',
  templateUrl: './order-item-select.component.html',
  styleUrls: ['./order-item-select.component.scss']
})
export class OrderItemSelectComponent implements OnInit {
  // hidePickContactFlag$: Observable<boolean>
  // hideAddContactFlag$: Observable<boolean>
  items$: Observable<Items>
  itemGroup$: Observable<string>
  owner: Contact


  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.items$ = this.store.select(selectItemsWithPrice)
    this.itemGroup$ = this.store.select(selectItemGroupPicked)
    this.store.select(selectLastItemOwner).subscribe(owner =>
      this.owner = owner
    )
  }


  // public openAddContact() {
  //   this.store.dispatch(openAddContact())
  // }

  public back() {
    this.store.dispatch(clearItemGroup())
    this.router.navigate(['/order/select-item-type'])
  }

  public setAsItem(id: string) {
    let item: CartItem
    // set the chosen id in the store
    this.store.dispatch(setItemId({ id }))
    // set the item properties in the store to the default data from item listing
    this.store.select(selectPickedItem).subscribe(pickedItem =>
      item = pickedItem
    )

    if (item.itemGroup === 'salad' || item.itemGroup === 'sandwich') {
      this.store.dispatch(loadItem({ item }))
      this.router.navigate(['/order/customize'])
    } else {
      let cartItem = item as CartItem
      cartItem.owner = this.owner
      this.store.dispatch(addItemToCart({ cartItem }))
      this.router.navigate(['/order/cart'])
    }

  }

}
