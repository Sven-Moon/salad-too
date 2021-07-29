import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { clearCart } from '../../order/state/cart/cart.actions';
import { PayInfoComponent } from '../pay-info/pay-info.component';

@Component({
  selector: 'app-pay-fail',
  templateUrl: './pay-fail.component.html',
  styleUrls: ['./pay-fail.component.scss']
})
export class PayFailComponent implements OnInit {
  bsRef: BsModalRef

  constructor(
    private router: Router,
    private store: Store,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  public tryAgain(): void {
    this.router.navigate(['/order/cart'])
    setTimeout(() => {
      this.bsRef = this.modalService.show(PayInfoComponent, { id: 120 })
    }, 750);
  }

  public cancel(): void {
    this.router.navigate(['/order/cart'])
    setTimeout(() => {
      this.store.dispatch(clearCart())
    }, 750);
    setTimeout(() => {
      this.router.navigate(['order/launch'])
    }, 750);
  }

}
