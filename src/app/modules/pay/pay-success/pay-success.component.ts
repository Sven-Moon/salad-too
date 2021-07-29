import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectReceipt } from '../../orders/state/orders.selectors';

@Component({
  selector: 'app-pay-success',
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.scss']
})
export class PaySuccessComponent implements OnInit {
  transactionNumber: string
  receipt: any

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.select(selectReceipt).subscribe(receipt =>
      this.receipt = receipt
    )
    console.log(this.receipt.transaction)
  }

}
