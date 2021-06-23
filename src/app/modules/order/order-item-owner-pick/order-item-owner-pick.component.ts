import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/internal/Observable';
import { Contact, Contacts, User } from 'src/app/models/User';
import { registerUser } from 'src/app/store/auth/auth.actions';
import { selectContacts, selectIsSignedIn, selectUser } from 'src/app/store/auth/auth.selectors';
import { LoginModalComponent } from '../../auth/login-modal/login-modal.component';
import { closeOwnerPick, openAddContact, setItemOwner, setUserAsOwner } from '../state/item/item.actions';

@Component({
  selector: 'app-order-item-owner-pick',
  templateUrl: './order-item-owner-pick.component.html',
  styleUrls: ['./order-item-owner-pick.component.scss']
})
export class OrderItemOwnerPickComponent implements OnInit {
  // --------- MODAL ---------
  bsModalRef: BsModalRef

  user$: Observable<User>
  signedIn$: Observable<boolean>
  contacts$: Observable<Contacts>

  constructor(
    private store: Store,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser)
    this.signedIn$ = this.store.select(selectIsSignedIn)
    this.contacts$ = this.store.select(selectContacts)

  }

  openAddContact() {
    this.store.dispatch(openAddContact())
  }

  closeOwnerPick() {
    this.store.dispatch(closeOwnerPick())
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
      // , {initial state}
    )
    this.bsModalRef.content.closeBtnName = 'Close'
  }

}
