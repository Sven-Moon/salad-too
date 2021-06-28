import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of } from 'rxjs';
import { selectIsSignedIn } from 'src/app/store/auth/auth.selectors';
import { LoginModalComponent } from '../../auth/login-modal/login-modal.component';
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

  constructor(
    private store: Store,
    private modalService: BsModalService
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


}

