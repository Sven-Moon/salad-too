import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { logout } from 'src/app/store/auth/auth.actions';
import { selectIsSignedIn } from 'src/app/store/auth/auth.selectors';
import { LoginModalComponent } from '../../auth/login-modal/login-modal.component';
import { clearCart } from '../../order/state/cart/cart.actions';
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
  logoutFlag: boolean = false

  constructor(
    private store: Store,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.navPointer$ = this.store.select(selectNavPointer)
    this.store.select(selectIsSignedIn).subscribe(signedIn =>
      this.signedIn$ = signedIn
    )
  }

  public openLoginModal() {
    this.bsModalRef = this.modalService.show(LoginModalComponent, { id: 100 })
    this.bsModalRef.content.closeBtnName = 'Close'
  }

  public displayLogOut() {
    this.logoutFlag = !this.logoutFlag
    setTimeout(() => {
      this.logoutFlag = false
    }, 5000)
  }

  public logout() {
    this.store.dispatch(logout())
    this.logoutFlag = false
    this.store.dispatch(clearItem())
    this.store.dispatch(clearCart())
    this.route.navigate(['/order/launch'])
  }
}

