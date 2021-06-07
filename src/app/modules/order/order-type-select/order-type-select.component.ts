import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { ItemType, ItemTypes } from 'src/app/models/ItemType';
import { setItemOwner, openOwnerPick, openAddContact, closeOwnerPick, closeAddContact, setItemType } from '../state/item/item.actions';
import { State } from '../state/item/item.reducer';
import { selectAddContactFlag, selectItemState, selectPickOwnerFlag } from '../state/item/item.selectors';
import { selectItemTypes } from '../state/staticData/static-data.selectors';

@Component({
  selector: 'app-order-type-select',
  templateUrl: './order-type-select.component.html',
  styleUrls: ['./order-type-select.component.scss']
})
export class OrderTypeSelectComponent implements OnInit {
  hidePickContactFlag$: Observable<boolean>
  hideAddContactFlag$: Observable<boolean>
  itemTypes$: Observable<ItemTypes>

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.hidePickContactFlag$ = this.store.select(selectPickOwnerFlag)
    this.hideAddContactFlag$ = this.store.select(selectAddContactFlag)
    this.itemTypes$ = this.store.select(selectItemTypes)
  }

  openOwnerPick() {
    this.store.dispatch(openOwnerPick())
  }

  openAddContact() {
    this.store.dispatch(openAddContact())
  }

  public setItemType(itemType: string): void {
    this.store.dispatch(setItemType({ itemType }))
  }


}
