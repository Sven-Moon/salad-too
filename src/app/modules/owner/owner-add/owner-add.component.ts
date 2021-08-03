import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { addContact } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-owner-add',
  templateUrl: './owner-add.component.html',
  styleUrls: ['./owner-add.component.scss']
})
export class OwnerAddComponent implements OnInit {
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
  }

  public closeAddContact() {
    this.addModalRef.hide()
  }

  public addContact(f: NgForm) {
    this.store.dispatch(addContact({
      name: f.value.name,
      email: f.value.email,
      img: './assets/images/profile_1.png'
    }))
    this.closeAddContact()
  }

}
