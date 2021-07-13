import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/internal/Observable';
import { Item } from 'src/app/models/Item';
import { Contact, Contacts, User } from 'src/app/models/User';
import { selectContacts, selectIsSignedIn, selectUser, selectUserEmail } from 'src/app/store/auth/auth.selectors';
import { LoginModalComponent } from '../../auth/login-modal/login-modal.component';
import { OrderItemOwnerAddModalComponent } from '../order-item-owner-add-modal/order-item-owner-add-modal.component';
import { updateLastOwner } from '../state/cart/cart.actions';
import { setItemName, setItemOwner } from '../state/item/item.actions';
import { selectCurrentItem } from '../state/item/item.selectors';

@Component({
  selector: 'app-order-item-owner-pick-modal',
  templateUrl: './order-item-owner-pick-modal.component.html',
  styleUrls: ['./order-item-owner-pick-modal.component.scss']
})
export class OrderItemOwnerPickModalComponent implements OnInit {
  // --------- MODAL ---------
  bsModalRef: BsModalRef

  user$: Observable<User>
  signedIn$: Observable<boolean>
  contacts$: Observable<Contacts>
  email$: Observable<string>
  currentItem: Item = undefined

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
  }

  openAddContact() {
    this.bsModalRef = this.modalService.show(OrderItemOwnerAddModalComponent)
    this.bsModalRef.content.closeBtnName = 'Close'
  }

  closeOwnerPick() {
    this.pickModalRef.hide()
  }

  // public setUserAsOwner(user: User): void {
  //   this.store.dispatch(setItemOwner({
  //     contact: {
  //       name: user.name,
  //       img: user.img,
  //       email: user.email
  //     }
  //   }))
  //   this.closeOwnerPick()
  // }

  public setItemOwner(contact: Contact): void {
    this.store.dispatch(setItemOwner({ contact }))
    this.closeOwnerPick()
    // if an item has already been selected, change the name
    // to include the (new) owner's name
    // new name is (first part of) <contact name>'s + Item name
    let name = contact.name.split(' ')[0].concat('\'s ', this.currentItem.name)
    this.store.dispatch(setItemName({ name }))
  }

  public openLogin() {
    this.bsModalRef = this.modalService.show(LoginModalComponent,
      { id: 100 }
    )
    this.bsModalRef.content.closeBtnName = 'Close'
  }

}
