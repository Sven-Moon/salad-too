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

@Injectable({ providedIn: 'root' })
export class PaymentMockInterceptor implements HttpInterceptor {

  constructor() { }


  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let url = environment.baseUrl + '/pay/payments'
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
    let transactionId = Math.random().toFixed(8).slice(2)
    let dateTime = Date.now()
    return {
      orderId: info.id,
      transactionId: transactionId,
      amount: info.amount,
      status: this.successByCcNum(info.ccNum),
      cc4: info.ccNum.slice(15),
      dateTime: dateTime
    }
  }

  //TODO: Fail by checkbox
  private successByCcNum(ccNum: string): string {
    return ccNum === '1234 5678 9012 3451'
      ? 'declined'
      : 'approved'
  }

  private randSuccess(): string {
    let success: boolean = Math.random() % 2 < .95
    return success
      ? 'approved'
      : 'declined'
  }

}
