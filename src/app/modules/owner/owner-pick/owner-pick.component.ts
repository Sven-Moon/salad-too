import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/internal/Observable';
import { Item, Items } from 'src/app/models/Item';
import { Contact, Contacts, User } from 'src/app/models/User';
import { selectContacts, selectIsSignedIn, selectUser, selectUserEmail } from 'src/app/store/auth/auth.selectors';
import { LoginModalComponent } from '../../auth/login-modal/login-modal.component';
import { OwnerAddComponent } from '../owner-add/owner-add.component';
import { setItemName, setItemOwner } from '../../order/state/item/item.actions'
import { selectCurrentItem } from '../../order/state/item/item.selectors';
import { selectAllItems } from '../../order/state/staticData/static-data.selectors';

@Component({
  selector: 'app-owner-pick',
  templateUrl: './owner-pick.component.html',
  styleUrls: ['./owner-pick.component.scss']
})
export class OwnerPickComponent implements OnInit {
  // --------- MODAL ---------
  bsModalRef: BsModalRef

  user$: Observable<User>
  signedIn$: Observable<boolean>
  contacts$: Observable<Contacts>
  email$: Observable<string>
  currentItem: Item = undefined
  allItems: Items

  constructor(
    private store: Store,
    private modalService: BsModalService,
    public pickModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser)
    this.signedIn$ = this.store.select(selectIsSignedIn)
    this.contacts$ = this.store.select(selectContacts)
    this.email$ = this.store.select(selectUserEmail)
    this.store.select(selectCurrentItem).subscribe(item =>
      this.currentItem = item
    )
    this.store.select(selectAllItems).subscribe(items => this.allItems = items)

  }

  openAddContact() {
    this.bsModalRef = this.modalService.show(OwnerAddComponent)
    this.bsModalRef.content.closeBtnName = 'Close'
  }

  closeOwnerPick() {
    this.pickModalRef.hide()
  }

  public setItemOwner(contact: Contact): void {
    this.store.dispatch(setItemOwner({ owner: contact }))
    this.closeOwnerPick()
    // if an item has already been selected, change the name
    // to include the (new) owner's name
    // new name is (first part of) <contact name>'s + Item name

    // this may be replacing a name, so get the name from the un-ownered name
    // consider that the id may have had * appended to it on duplication
    if (this.currentItem.id) {
      let pureId = this.currentItem.id.replace(/\*/, '')
      let pureName = this.allItems.find(item => item.id == pureId).name
      let name: string = this.currentItem.owner.name.concat('\'s ', pureName)

      // let name = contact.name.split(' ')[0].concat('\'s ', this.currentItem.name)
      this.store.dispatch(setItemName({ name }))
    }
  }

  public openLogin() {
    this.bsModalRef = this.modalService.show(LoginModalComponent,
      { id: 100 }
    )
    this.bsModalRef.content.closeBtnName = 'Close'
  }

}
