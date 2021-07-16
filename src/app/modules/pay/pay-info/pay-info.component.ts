import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
      Validators.minLength(16),
      Validators.maxLength(16)
    ]],
    expMonth: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2)
    ]],
    expYear: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2)
    ]],
    cvv: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3)
    ]]
  })

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public payModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.total = 15.57
  }

  public submit() {
    this.payModalRef.hide()
  }

}
