import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Contact } from 'src/app/models/Contact';
import { addContact, addContactSuccess } from 'src/app/store/auth/auth.actions';
import { selectIsSignedIn } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-owner-add',
  templateUrl: './owner-add.component.html',
  styleUrls: ['./owner-add.component.scss']
})
export class OwnerAddComponent implements OnInit {
  signedIn: boolean
  // --------- MODAL ---------
  bsModalRef: BsModalRef
  form = {
    name: null,
    email: null
  }

  constructor(
    private store: Store,
    public addModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.store.select(selectIsSignedIn)
      .subscribe(state => this.signedIn = state)
  }

  public closeAddContact() {
    this.addModalRef.hide()
  }

  public addContact(f: NgForm) {
    let emailId: string
    if (f.value.email===null) {
      emailId = (Math.random()*1E8).toFixed(0).toString() + '@unknown.com'
    } else {
      emailId = f.value.email
    }

    let contact: Contact = {
      id: emailId,
      name: f.value.name,
      email: emailId,
      img: './assets/images/profile_1.png'
    }
    if (this.signedIn) {
      this.store.dispatch(addContact({ contact }))
    } else {
      this.store.dispatch(addContactSuccess({ contact }))
    }

    this.closeAddContact()
  }

}
