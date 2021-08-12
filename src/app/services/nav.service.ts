import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { updateNavPointer } from '../modules/shared/state/shared.actions';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(
    private router: Router,
    private store: Store
  ) { }

  public updateNavPosition(): void {
    let url = this.router.url
    let positionValue: number = 0;
    switch (url) {
      case '/order/customize':
        positionValue = 5
        break
      case '/order/select-item':
        positionValue = 5
        break
      case '/order/select-item-type':
        positionValue = 5
        break
      case '/order/launch':
        positionValue = 5
        break
      case '/order/cart':
        positionValue = 4
        break
      case '/orders/status':
        positionValue = 3
        break
      case '/orders/history':
        positionValue = 2
        break
      case '/account':
        positionValue = 1
        break
      default: 5
    }
    // positionValue = s a string as X%
    let pointer = (102 - +positionValue * 20).toString() + '%'
    this.store.dispatch(updateNavPointer({ pointer }))
  }
}
