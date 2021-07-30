import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { selectReceipt } from '../../orders/state/orders.selectors';
import { PayEmailReceiptComponent } from '../pay-email-receipt/pay-email-receipt.component';

@Component({
  selector: 'app-pay-success',
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.scss']
})
export class PaySuccessComponent implements OnInit {
  transactionNumber: string
  receipt: any
  bsRef: BsModalRef

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.store.select(selectReceipt).subscribe(receipt =>
      this.receipt = receipt
    )
  }

  /**
   * emails Receipt to user email address (or says it does, anyway)
   */
  public emailReceipt() {
    this.bsRef = this.modalService.show(PayEmailReceiptComponent, { id: 130 })
  }

  public print(): void {
    window.print()

    //TODO: [SAL2-201] make a separate receipt page for printing

    // *****
    // To keep styling -- appendChild didn't work at all
    // *****
    // var file = WindowPrt.document.createElement("link");
    // file.setAttribute("rel", "stylesheet");
    // file.setAttribute("type", "text/css");
    // file.setAttribute("href", './styles.css');
    // WindowPrt.document.head.appendChild(file);

    // *****
    // compiler won't allow attachment of scss files & a
    // substituted css file  does not seem to 'register' as a styles
    // document within the header (though it does attach)
    // *****
    // const printContent = document.getElementById('receipt')
    // const WindowPrt = window.open('', '',
    //   'left=0,top=0,width=500,height=700,toolbar=0,scrollbars=0,status=0'
    // )
    // WindowPrt.document.write('<link rel="stylesheet" type="text/css" src="./styles.css">');
    // WindowPrt.document.write(printContent.innerHTML)
    // WindowPrt.document.close()
    // WindowPrt.focus()
    // WindowPrt.print()
    // WindowPrt.close()
  }
}
