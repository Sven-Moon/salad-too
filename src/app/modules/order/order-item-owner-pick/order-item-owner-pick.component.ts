import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/internal/Observable';
import { Contacts, User } from 'src/app/models/User';
import { State } from 'src/app/store/user/user.reducer';
import { selectUserState } from 'src/app/store/user/user.selectors';
import { LoginModalComponent } from '../../auth/login-modal/login-modal.component';
import { closeOwnerPick, openAddContact, setItemOwner } from '../state/item/item.actions';

@Component({
  selector: 'app-order-item-owner-pick',
  templateUrl: './order-item-owner-pick.component.html',
  styleUrls: ['./order-item-owner-pick.component.scss']
})
export class OrderItemOwnerPickComponent implements OnInit {
  // --------- MODAL ---------
  bsModalRef: BsModalRef

  user$: Observable<State>
  // user: {
  //   id: "abc100",
  //   name: "Sven"
  // }

  contacts: Contacts = [
    {
      "email": "BillKurtis@npr.com",
      "name": "Bill Kurtis",
      "img": "./assets/images/profile_1.png"
    },
    {
      "email": "DougBerman@npr.com",
      "name": "Doug Berman",
      "img": "./assets/images/profile_1.png"
    },
    {
      "email": "PeterSegal@npr.com",
      "name": "Peter Segal",
      "img": "./assets/images/profile_1.png"
    },
  ]

  constructor(
    private store: Store,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUserState)
  }

  openAddContact() {
    this.store.dispatch(openAddContact())
  }

  closeOwnerPick() {
    this.store.dispatch(closeOwnerPick())
  }

  showSignInModal() {
    // this.store.dispatch(showSignInModal())
  }

  public setItemOwner(id: string): void {
    this.store.dispatch(setItemOwner({ id }))
  }

  public openLogin() {
    this.bsModalRef = this.modalService.show(LoginModalComponent,
      // , {initial state}
    )
    this.bsModalRef.content.closeBtnName = 'Close'
  }

}
