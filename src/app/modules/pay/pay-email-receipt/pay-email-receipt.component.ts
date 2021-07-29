import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { selectUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-pay-email-receipt',
  templateUrl: './pay-email-receipt.component.html',
  styleUrls: ['./pay-email-receipt.component.scss']
})
export class PayEmailReceiptComponent implements OnInit {
  email: string

  constructor(
    private store: Store,
    public emailReceiptModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.store.select(selectUser).subscribe(user =>
      this.email = user.email
    )
  }


}
