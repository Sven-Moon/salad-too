import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { ccPayment, Payment } from '../../models/Payment';
import { selectFail } from 'src/app/modules/pay/state/pay.selectors';

@Injectable({ providedIn: 'root' })
export class PaymentMockInterceptor implements HttpInterceptor {

  constructor(
    private store: Store
  ) {
  }


  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let url = environment.baseUrl + '/payments'
    if (req.method === 'POST' && req.url == url) {
      let paymentReq = req.body;

      const paymentRes: Payment = this.buildReplyObj(paymentReq)

      const response = new HttpResponse({
        body: paymentRes
      })

      return of(response)
    }

    return next.handle(req)
  }

  private buildReplyObj(info: ccPayment): Payment {
    let fail: boolean
    this.store.select(selectFail)
      .subscribe(failFlag => {fail = failFlag})
    let status: string = 'approved'
    if (fail) { status = 'declined' }
    console.log(fail)

    let transactionId = Math.random().toFixed(8).slice(2)
    let dateTime = Date.now()

    return {
      orderId: info.id,
      transactionId: transactionId,
      amount: info.amount,
      status: status,
      cc4: info.ccNum.slice(15),
      dateTime: dateTime
    }
  }

}
