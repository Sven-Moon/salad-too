import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item, Items } from 'src/app/models/Item';
import { clearItemGroup, loadItem, openAddContact, setItemId } from '../state/item/item.actions';
import { selectItemGroupPicked, selectItemsOfGroup, selectItemsWithPrice, selectPickedItem } from '../state/item/item.selectors';

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


  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.hidePickContactFlag$ = this.store.select(selectPickOwnerFlag)
    // this.hideAddContactFlag$ = this.store.select(selectAddContactFlag)
    this.items$ = this.store.select(selectItemsWithPrice)
    this.itemGroup$ = this.store.select(selectItemGroupPicked)
  }


  public openAddContact() {
    this.store.dispatch(openAddContact())
  }

  public back() {
    this.store.dispatch(clearItemGroup())
  }

  public setAsItem(id: string) {
    this.store.dispatch(setItemId({ id }))
    this.store.select(selectPickedItem).subscribe(
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
