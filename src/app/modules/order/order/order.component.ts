import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/auth/auth.selectors';
import { updateLastOwner } from '../state/cart/cart.actions';
import { loadStaticData } from '../state/staticData/static-data.actions';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.select(selectUser).subscribe(user => {
      let currentUser = {
        name: user.name,
        img: user.img,
        email: user.email
      }
      this.store.dispatch(updateLastOwner({ data: currentUser }))
    }
    )
    this.store.dispatch(loadStaticData())
  }

}
