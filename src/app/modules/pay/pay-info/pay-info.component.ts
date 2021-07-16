import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Payment } from 'src/app/models/Payment';
import { attemptPayment, updateCcInfo } from '../state/pay.actions';
import { selectPayment } from '../state/pay.selectors';

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
      Validators.minLength(16),
      Validators.maxLength(16)
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

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public payModalRef: BsModalRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.select(selectPayment).subscribe(payment =>
      this.payment = payment
    )
  }

  public submit() {
    let ccInfo = {
      name: this.ccForm.controls.name.value,
      ccNum: this.ccForm.controls.ccNum.value,
      exp: this.ccForm.controls.expMonth.value + '/' + this.ccForm.controls.expYear.value,
      cvv: this.ccForm.controls.cvv.value,
    }
    this.store.dispatch(updateCcInfo({ ccInfo }))
    this.store.dispatch(attemptPayment({ payment: this.payment }))
    if (this.payment.status === 'success') {
      this.router.navigate(['/pay/success'])
    } else {
      this.router.navigate(['/pay/failed'])
    }
    this.payModalRef.hide()
  }

}
