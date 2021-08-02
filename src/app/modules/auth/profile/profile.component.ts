import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contacts, User } from 'src/app/models/User';
import { selectContacts, selectUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  contacts$: Observable<Contacts>
  user: User

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.contacts$ = this.store.select(selectContacts)
    this.store.select(selectUser).subscribe(user =>
      this.user = user
    )
  }


}
