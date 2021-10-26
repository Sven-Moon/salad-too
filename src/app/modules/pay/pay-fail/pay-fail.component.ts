import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Order } from 'src/app/models/Order';
import { Payment } from 'src/app/models/Payment';
import { Transaction } from 'src/app/models/Transaction';
import { clearCart } from '../../order/state/cart/cart.actions';
import { selectReceipt } from '../../orders/state/orders.selectors';
import { PayInfoComponent } from '../pay-info/pay-info.component';

@Component({
  selector: 'app-pay-fail',
  templateUrl: './pay-fail.component.html',
  styleUrls: ['./pay-fail.component.scss']
})
export class PayFailComponent implements OnInit {
  bsRef: BsModalRef
  order: Order
  transaction: Payment

  constructor(
    private router: Router,
    private store: Store,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.store.select(selectReceipt)
      .subscribe(data => {
        this.order = data.order
        this.transaction = data.transaction
      })
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
      setTimeout(() => {
        this.router.navigate(['order/launch'])
      }, 750);
    }, 750);
  }

}
