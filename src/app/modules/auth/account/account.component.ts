import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Contacts, User } from 'src/app/models/User';
import { updateUserName } from 'src/app/store/auth/auth.actions';
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
    newUsername: false,
  }
  editEmailForm = {
    email: null,
    password: null,
    newEmail: false,
  }
  editPhoneForm = {
    email: null,
    password: null,
    newPhoneNumber: false,
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
      email: this.user.email,
      password: f.value.password,
      newUsername: f.value.newUsername
    }))
  }

  public openEditUserPassword(): void {
    // this.bsModalRef = this.modalService.show(, { id: 210 })
  }

  public editPassword(name: string): void {
    // this.store.dispatch(editUserPassword({ name }))
  }

  public openEditUserEmail(): void {
    // this.bsModalRef = this.modalService.show(, { id: 210 })
  }

  public editEmail(name: string): void {
    // this.store.dispatch(editUserEmail({ name }))
  }

  public openEditUserPhone(): void {
    // this.bsModalRef = this.modalService.show(, { id: 210 })
  }

  public editPhone(name: string): void {
    // this.store.dispatch(editUserName({ name }))
  }


}
