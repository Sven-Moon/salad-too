import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { Contacts } from 'src/app/models/Contact';
import { NavService } from 'src/app/services/nav.service';
import { addContact,  deleteContact,  updateUser } from 'src/app/store/auth/auth.actions';
import { selectContacts, selectUser } from 'src/app/store/auth/auth.selectors';

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
    currentPassword: null,
    password: null,
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
  addContactForm = {
    contactName: null,
    contactEmail: null
  }

  constructor(
    private store: Store,
    private modalService: BsModalService,
    private navService: NavService
  ) { }

  ngOnInit(): void {
    this.navService.updateNavPosition()
    this.contacts$ = this.store.select(selectContacts)
    this.store.select(selectUser).subscribe(user =>
      this.user = Object.assign({}, user)
    )
  }

  // Opens all modals, only allowing 1 open at a time
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public editUserName(f: NgForm): void {
    let oldName = this.user.name
    this.user.name = f.value.newUsername
    this.updateUser(
      this.user,
      oldName,
      f.value.newUsername,
      'username',
      f.value.password
    )

  }

  public editUserPassword(f: NgForm): void {
    let oldPassword = this.user.password
    this.user.password = f.value.password
    this.updateUser(
      this.user,
      oldPassword,
      f.value.password,
      'password',
      f.value.currentPassword
    )
  }

  public editUserEmail(f: NgForm): void {
    let oldEmail = this.user.email
    this.user.email = f.value.newEmail
    this.updateUser(
      this.user,
      oldEmail,
      f.value.newEmail,
      'email',
      f.value.password
    )
  }

  public editUserPhone(f: NgForm): void {
    let oldPhoneNumber = this.user.phoneNumber
    this.user.phoneNumber = f.value.newPhoneNumber
    this.updateUser(
      this.user,
      oldPhoneNumber,
      f.value.newPhoneNumber,
      'phone number',
      f.value.password
    )
  }

  private updateUser(user: User, oldValue: string,newValue: string,
    field: string, password: string
  ): void {
    this.store.dispatch(updateUser({user, oldValue, newValue, field, password}))
  }

  /** CONTACTS*/
  public addNewContact(f: NgForm): void {
    let contact = {
      id: f.value.contactEmail,
      name: f.value.contactName,
      email: f.value.contactEmail,
      img: './assets/images/profile_1.png' }
    this.store.dispatch(addContact({ contact }))
  }

  public deleteContact(id: string): void {
    this.store.dispatch(deleteContact({
      id: id
    }))
  }

}
