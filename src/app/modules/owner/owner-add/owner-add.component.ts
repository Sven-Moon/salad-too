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
    let contact: Contact = {
      id: f.value.email,
      name: f.value.name,
      email: f.value.email,
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
