import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { addContact } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-order-item-owner-add-modal',
  templateUrl: './order-item-owner-add-modal.component.html',
  styleUrls: ['./order-item-owner-add-modal.component.scss']
})
export class OrderItemOwnerAddModalComponent implements OnInit {
  // --------- MODAL ---------
  bsModalRef: BsModalRef
  form = {
    name: null,
    email: null
  }

  constructor(
    private store: Store,
    private modalService: BsModalService,
    public addModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  public closeAddContact() {
    // this.store.dispatch(closeAddContact())
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
