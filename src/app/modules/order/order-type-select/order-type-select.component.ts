import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { setItemOwner, openOwnerPick, openAddContact, closeOwnerPick, closeAddContact } from '../state/item/item.actions';
import { State } from '../state/item/item.reducer';
import { selectAddContactFlag, selectItemState, selectPickOwnerFlag } from '../state/item/item.selectors';

@Component({
  selector: 'app-order-type-select',
  templateUrl: './order-type-select.component.html',
  styleUrls: ['./order-type-select.component.scss']
})
export class OrderTypeSelectComponent implements OnInit {
  hidePickContactFlag$: Observable<boolean>
  hideAddContactFlag$: Observable<boolean>

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.hidePickContactFlag$ = this.store.select(selectPickOwnerFlag)
    this.hideAddContactFlag$ = this.store.select(selectAddContactFlag)
  }

  // open THINGS

  openOwnerPick() {
    this.store.dispatch(openOwnerPick())
  }

  openAddContact() {
    this.store.dispatch(openAddContact())
  }

  // close THINGS

  closeAddContact() {
    this.store.dispatch(closeAddContact())
  }


  setProfileTab(id: string) {
    this.store.dispatch(setItemOwner({ id }))
  }

}
