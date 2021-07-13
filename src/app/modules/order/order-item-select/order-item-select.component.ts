import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem, Item, Items } from 'src/app/models/Item';
import { addItemToCart } from '../state/cart/cart.actions';
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


  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.items$ = this.store.select(selectItemsWithPrice)
    this.itemGroup$ = this.store.select(selectItemGroupPicked)
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
      this.store.dispatch(addItemToCart({ cartItem }))
      this.router.navigate(['/order/cart'])
    }

  }

}
