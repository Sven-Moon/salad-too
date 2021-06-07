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
  // hidePickContactFlag$: Observable<boolean>
  hidePickContactFlag$: boolean
  hideAddContactFlag$: Observable<boolean>
  itemState: Observable<State>

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    // this.hidePickContactFlag$ = this.store.select(selectPickOwnerFlag)
    this.store.select(selectPickOwnerFlag).subscribe(flag =>
      this.hidePickContactFlag$ = flag
    )
    this.hideAddContactFlag$ = this.store.select(selectAddContactFlag),
      console.log(this.hideAddContactFlag$)
  }

  // open THINGS

  openOwnerPick() {
    console.log("openOwnerPick fired")
    this.store.dispatch(openOwnerPick())
  }

  openAddContact() {
    this.store.dispatch(openAddContact())
  }

  // close THINGS

  closeOwnerPick() {
    this.store.dispatch(closeOwnerPick())
  }

  closeAddContact() {
    this.store.dispatch(closeAddContact())
  }


  setProfileTab(id: string) {
    this.store.dispatch(setItemOwner({ id }))
  }

}
