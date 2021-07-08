import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DefaultUserService } from '../services/default-user.service';
import { setGuestId } from '../store/auth/auth.actions';
import { selectIsSignedIn, selectUser } from '../store/auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'salad-too';

  constructor(
    private guestService: DefaultUserService,
    private store: Store
  ) { }

  ngOnInit() {
    this.store.select(selectUser).subscribe(user => {
      if (!user || !user.email) {
        let id = this.guestService.generateId()
        this.store.dispatch(setGuestId({ id }))
      }
    })
  }
}
