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
      case '/cart-launch':
        positionValue = 5
      case '/cart-customize-item':
        positionValue = 5
      case '/cart-item-select':
        positionValue = 5
      case '/cart-type-select':
        positionValue = 5
      case '/cart-launch':
        positionValue = 5
      case '/cart-view':
        positionValue = 4
      case '/pay':
        positionValue = 3
      case '/order-status':
        positionValue = 2
      case '/profile':
        positionValue = 1
      default: 5
    }
    // positionValue = s a string as X%
    let pointer = (100 - +positionValue * 20).toString() + '%'
    this.store.dispatch(updateNavPointer({ pointer }))
  }
}
