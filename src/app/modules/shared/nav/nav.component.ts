import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { DefaultUserService } from 'src/app/services/default-user.service';
import { logout, setGuestId } from 'src/app/store/auth/auth.actions';
import { selectIsSignedIn, selectUser } from 'src/app/store/auth/auth.selectors';
import { LoginModalComponent } from '../../auth/login-modal/login-modal.component';
import { clearCart, updateLastOwner } from '../../order/state/cart/cart.actions';
import { selectCartCount } from '../../order/state/cart/cart.selectors';
import { clearItem } from '../../order/state/item/item.actions';
import { selectNavPointer } from '../state/shared.selectors';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  navPointer$: Observable<string> = of('0%')
  signedIn$: boolean
  bsModalRef: BsModalRef
  cartCount: number

  constructor(
    private store: Store,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private guestService: DefaultUserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.navPointer$ = this.store.select(selectNavPointer)
    this.store.select(selectIsSignedIn).subscribe(signedIn =>
      this.signedIn$ = signedIn
    )
    this.store.select(selectCartCount).subscribe(count =>
      this.cartCount = count
    )
  }

  public openLoginModal() {
    this.bsModalRef = this.modalService.show(LoginModalComponent, { id: 100 })
    this.bsModalRef.content.closeBtnName = 'Close'
  }

  public logout() {
    this.authService.logout()
  }
}

