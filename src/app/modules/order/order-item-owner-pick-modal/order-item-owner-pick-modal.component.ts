import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/internal/Observable';
import { Contact, Contacts, User } from 'src/app/models/User';
import { registerUser } from 'src/app/store/auth/auth.actions';
import { selectContacts, selectIsSignedIn, selectUser, selectUserEmail } from 'src/app/store/auth/auth.selectors';
import { LoginModalComponent } from '../../auth/login-modal/login-modal.component';
import { OrderItemOwnerAddModalComponent } from '../order-item-owner-add-modal/order-item-owner-add-modal.component';
import { closeOwnerPick, openAddContact, setItemOwner, setUserAsOwner } from '../state/item/item.actions';

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

  }

  openAddContact() {
    // this.store.dispatch(openAddContact())
    this.bsModalRef = this.modalService.show(OrderItemOwnerAddModalComponent)
    this.bsModalRef.content.closeBtnName = 'Close'
  }

  closeOwnerPick() {
    // this.store.dispatch(closeOwnerPick())
    this.pickModalRef.hide()
  }

  public setUserAsOwner(user: User): void {
    this.store.dispatch(setUserAsOwner({ user }))
    this.closeOwnerPick()
  }

  public setItemOwner(contact: Contact): void {
    this.store.dispatch(setItemOwner({ contact }))
    this.closeOwnerPick()
  }

  public openLogin() {
    this.bsModalRef = this.modalService.show(LoginModalComponent,
      { id: 100 }
    )
    this.bsModalRef.content.closeBtnName = 'Close'
  }

}
