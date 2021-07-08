import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { ItemGroups } from 'src/app/models/ItemGroup';
import { Contact } from 'src/app/models/User';
import { selectLastItemOwner } from '../state/cart/cart.selectors';
import { openAddContact, setItemGroup, setLastItemOwnerAsItemOwner, setItemId, clearItem } from '../state/item/item.actions';
import { selectItemGroups } from '../state/staticData/static-data.selectors';

@Component({
  selector: 'app-order-type-select',
  templateUrl: './order-type-select.component.html',
  styleUrls: ['./order-type-select.component.scss']
})
export class OrderTypeSelectComponent implements OnInit {
  itemGroups$: Observable<ItemGroups>
  owner: Contact

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itemGroups$ = this.store.select(selectItemGroups)
    // clear item by setting id to null
    this.store.dispatch(clearItem())

    // lastItemOwner initially set to user
    this.store.select(selectLastItemOwner).subscribe(owner =>
      this.owner = owner
    )
    this.store.dispatch(setLastItemOwnerAsItemOwner({ owner: this.owner }))

  }

  // openOwnerPick() {
  //   this.store.dispatch(openOwnerPick())
  // }

  openAddContact() {
    this.store.dispatch(openAddContact())
  }

  public setItemGroup(itemGroup: string): void {
    this.store.dispatch(setItemGroup({ itemGroup }))
  }


}
