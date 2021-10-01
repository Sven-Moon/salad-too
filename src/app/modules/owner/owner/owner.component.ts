import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/internal/Observable';
import { Contact, User } from 'src/app/models/User';
import { selectUser } from 'src/app/store/auth/auth.selectors';
import { OwnerPickComponent } from '../owner-pick/owner-pick.component';
import { selectItemOwner } from '../../order/state/item/item.selectors';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  itemGroup$: Observable<string>
  user$: Observable<User>
  owner$: Observable<Contact>
  bsModalRef: BsModalRef

  constructor(
    private store: Store,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser)
    this.owner$ = this.store.select(selectItemOwner)
  }

  openOwnerPick(): void {
    this.bsModalRef = this.modalService.show(OwnerPickComponent,
      // {initial state}
    )
    this.bsModalRef.content.closeBtnName = 'Close'
  }

}
