import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Payment, Payments } from 'src/app/models/Payment';
import { attemptPayment, clearPayment, markPayOnPickup, updateCcInfo, updateIsSelected, updatePayment } from '../state/pay.actions';
import { selectPayment, selectPayments } from '../state/pay.selectors';
import { ViewChild, ElementRef } from '@angular/core';
import { removePaidItemsFromCart } from '../../order/state/cart/cart.actions';
import { selectCartTotal } from '../../order/state/cart/cart.selectors';


@Component({
  selector: 'app-pay-info',
  templateUrl: './pay-info.component.html',
  styleUrls: ['./pay-info.component.scss']
})
export class PayInfoComponent implements OnInit {
  total: number = 0
  ccForm = this.fb.group({
    name: ['Bob', [
      Validators.required,
      Validators.minLength(1)
    ]],
    ccNum: ['1234567890123456', [
      Validators.required,
      Validators.pattern('^[ 0-9]*$'),
      Validators.minLength(17)
    ]],
    expMonth: ['12', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2)
    ]],
    expYear: ['34', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2)
    ]],
    cvv: ['234', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3)
    ]]
  })
  payment: Payment
  payments: Payments

  @ViewChild('ccNum') ccNumberField: ElementRef

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public payModalRef: BsModalRef,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.store.select(selectCartTotal).subscribe(total =>
      this.total = total
    )
  }

  public submit() {
    const { cc } = this.ccForm.controls
    // create a ccInfo Object
    let ccInfo = {
      name: this.ccForm.controls.name.value,
      ccNum: this.ccForm.controls.ccNum.value,
      exp: this.ccForm.controls.expMonth.value + '/' + this.ccForm.controls.expYear.value,
      cvv: this.ccForm.controls.cvv.value,
    }
    // add info for storage (match with reply from server)
    let id: string = Math.random().toString().substr(2, 8)
    // cc4 is last 4 digits of cc#
    let cc4: string = (this.ccForm.controls.ccNum.value).toString().substr(15, 4)
    let payment = {
      id: id,
      amount: this.total,
      cc4: cc4,
      status: "pending"
    }
    this.store.dispatch(updatePayment({ payment }))
    this.store.dispatch(attemptPayment({ payment, ccInfo }))
    this.store.dispatch(clearPayment())
  }

  /* Insert spaces to enhance legibility of credit card numbers */
  creditCardNumberSpacing() {
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

}
