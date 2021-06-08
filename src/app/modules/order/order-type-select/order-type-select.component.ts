import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { ItemGroup, ItemGroups } from 'src/app/models/ItemGroup';
import { setItemOwner, openOwnerPick, openAddContact, closeOwnerPick, closeAddContact, setItemGroup } from '../state/item/item.actions';
import { State } from '../state/item/item.reducer';
import { selectAddContactFlag, selectItemState, selectPickOwnerFlag } from '../state/item/item.selectors';
import { selectItemGroups } from '../state/staticData/static-data.selectors';

@Component({
  selector: 'app-order-type-select',
  templateUrl: './order-type-select.component.html',
  styleUrls: ['./order-type-select.component.scss']
})
export class OrderTypeSelectComponent implements OnInit {
  hidePickContactFlag$: Observable<boolean>
  hideAddContactFlag$: Observable<boolean>
  itemGroups$: Observable<ItemGroups>

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.hidePickContactFlag$ = this.store.select(selectPickOwnerFlag)
    this.hideAddContactFlag$ = this.store.select(selectAddContactFlag)
    this.itemGroups$ = this.store.select(selectItemGroups)
  }

  openOwnerPick() {
    this.store.dispatch(openOwnerPick())
  }

  openAddContact() {
    this.store.dispatch(openAddContact())
  }

  public setItemGroup(itemGroup: string): void {
    this.store.dispatch(setItemGroup({ itemGroup }))
  }


}
