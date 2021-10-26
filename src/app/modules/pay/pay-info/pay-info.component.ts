import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Payment, Payments } from 'src/app/models/Payment';
import { attemptPayment, clearPayment, toggleFailFlag } from '../state/pay.actions';
import { ViewChild, ElementRef } from '@angular/core';
import { selectCartItems, selectCartTotal } from '../../order/state/cart/cart.selectors';
import { Order } from 'src/app/models/Order';
import { CartItems } from 'src/app/models/Item';
import { createOrder } from '../../orders/state/orders.actions';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-pay-info',
  templateUrl: './pay-info.component.html',
  styleUrls: ['./pay-info.component.scss']
})
export class PayInfoComponent implements OnInit {
  total: number = 0
  ccForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(1)
    ]],
    ccNum: ['', [
      Validators.required,
      Validators.pattern('^[ 0-9]*$'),
      Validators.minLength(17)
    ]],
    expMonth: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2),
      Validators.max(12),
      Validators.min(1),
    ]],
    expYear: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2),
      Validators.max(99),
      Validators.min(1),
    ]],
    cvv: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3)
    ]]
  })
  payment: Payment
  payments: Payments
  failFlag

  @ViewChild('ccNum') ccNumberField: ElementRef

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public payModalRef: BsModalRef,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.store.select(selectCartTotal).subscribe(total =>
      this.total = total
    )
  }

  public submit():void {
    // create a ccInfo Object
    let ccInfo = {
      name: this.ccForm.controls.name.value,
      ccNum: this.ccForm.controls.ccNum.value,
      exp: this.ccForm.controls.expMonth.value + '/' + this.ccForm.controls.expYear.value,
      cvv: this.ccForm.controls.cvv.value,
    }
    // add info for storage (match with reply from server)
    let orderId: string = Math.random().toString().substr(2, 8)
    // cc4 is last 4 digits of cc#
    let cc4: string = (this.ccForm.controls.ccNum.value).toString().substr(15, 4)
    let payment = {
      orderId: orderId,
      amount: this.total,
      cc4: cc4,
      status: "pending"
    }
    let cartItems: CartItems
    this.store.select(selectCartItems).subscribe(items =>
      cartItems = items
    )

    let unsortedOrder: Order = {
      id: orderId,
      items: cartItems,
      total: '$' + this.total.toFixed(2),
      status: "Pending Payment",
      payments: [],
      received: null,
      completed: null,
      favorite: false
    }

    let order = this.orderService.sortOrderByItemName(unsortedOrder)
    /** order is submitted 'pending payment
     * payment updates are sent to the server (then updated here)
     * ... but this fo-app updates the payments
     */
    this.store.dispatch(createOrder({ order }))
    // this.store.dispatch(updatePayment({ payment }))
    this.store.dispatch(attemptPayment({ payment, ccInfo }))
    // this.store.dispatch(clearPayment())
  }

  /* Insert spaces to enhance legibility of credit card numbers */
  creditCardNumberSpacing():void {
    const input = this.ccNumberField.nativeElement;
    const { selectionStart } = input;
    const { ccNum } = this.ccForm.controls;

    let trimmedCardNum = ccNum.value.replace(/\s+/g, '');

    if (trimmedCardNum.length > 16) {
      trimmedCardNum = trimmedCardNum.substr(0, 16);
    }

    /* Handle American Express 4-6-5 spacing */
    const partitions = trimmedCardNum.startsWith('34') || trimmedCardNum.startsWith('37')
      ? [4, 6, 5]
      : [4, 4, 4, 4];

    const numbers = [];
    let position = 0;
    partitions.forEach(partition => {
      const part = trimmedCardNum.substr(position, partition);
      if (part) numbers.push(part);
      position += partition;
    })

    ccNum.setValue(numbers.join(' '));

    /* Handle caret position if user edits the number later */
    if (selectionStart < ccNum.value.length - 1) {
      input.setSelectionRange(selectionStart, selectionStart, 'none');
    }
  }

  public toggleFail():void {
    this.store.dispatch(toggleFailFlag({flag: this.failFlag}))
  }

  public autoFill(): void {
    this.ccForm.setValue({
      name: 'Bob',
      ccNum: '1234567890123456',
      cvv: '123',
      expMonth: '01',
      expYear: '24'
    })
    this.creditCardNumberSpacing()
  }


}
