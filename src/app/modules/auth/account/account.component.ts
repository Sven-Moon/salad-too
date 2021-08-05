import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Contacts, User } from 'src/app/models/User';
import { updateEmail, updatePassword, updatePhone, updateUserName } from 'src/app/store/auth/auth.actions';
import { selectContacts, selectUser } from 'src/app/store/auth/auth.selectors';
import { OwnerAddComponent } from '../../owner/owner-add/owner-add.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  contacts$: Observable<Contacts>
  user: User
  modalRef: BsModalRef
  editNameForm = {
    password: null,
    newUsername: null,
  }
  editPasswordForm = {
    password: null,
    newPassword: null,
    confirmPassword: null,
  }
  editEmailForm = {
    email: null,
    password: null,
    newEmail: null,
  }
  editPhoneForm = {
    email: null,
    password: null,
    newPhoneNumber: null,
  }

  constructor(
    private store: Store,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.contacts$ = this.store.select(selectContacts)
    this.store.select(selectUser).subscribe(user =>
      this.user = user
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public openEditUserName(): void {
    // this.bsModalRef = this.modalService.show(, { id: 210 })
  }

  public editUserName(f: NgForm): void {
    this.store.dispatch(updateUserName({
      id: this.user.id,
      password: f.value.password,
      newUsername: f.value.newUsername
    }))
  }


  public editPassword(f: NgForm): void {
    this.store.dispatch(updatePassword({
      id: this.user.id,
      password: f.value.password,
      newPassword: f.value.newPassword
    }))
  }


  public editEmail(f: NgForm): void {
    this.store.dispatch(updateEmail({
      id: this.user.id,
      password: f.value.password,
      newEmail: f.value.newEmail
    }))
  }

  public editPhone(f: NgForm): void {
    this.store.dispatch(updatePhone({
      id: this.user.id,
      password: f.value.password,
      newPhone: f.value.newPhoneNumber
    }))
  }


}
