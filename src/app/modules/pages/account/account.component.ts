import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Contacts, User } from 'src/app/models/User';
import { editUserName } from 'src/app/store/auth/auth.actions';
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
  bsModalRef: BsModalRef

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

  public openEditUserName(): void {
    // this.bsModalRef = this.modalService.show(, { id: 210 })
  }

  public editName(name: string): void {
    this.store.dispatch(editUserName({ name }))
  }

  public openAddContact() {
    this.bsModalRef = this.modalService.show(OwnerAddComponent, { id: 210 })
  }

}
