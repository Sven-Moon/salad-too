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
    let pointer: string = '';
    switch (url) {
      case '/order/customize':
        pointer = 'order'
        break
      case '/order/select-item':
        pointer = 'order'
        break
      case '/order/select-item-type':
        pointer = 'order'
        break
      case '/order/launch':
        pointer = 'order'
        break
      case '/order/cart':
        pointer = 'cart'
        break
      case '/orders/status':
        pointer = 'status'
        break
      case '/orders/history':
        pointer = 'history'
        break
      case '/account':
        pointer = 'account'
        break
      default: 'order'
    }
    //  pointer = s a string as X%
    // let pointer = (102 - + pointer * 20).toString() + '%'
    this.store.dispatch(updateNavPointer({ pointer }))
  }
}
