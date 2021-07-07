import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { Observable } from 'rxjs';
import { Alert } from 'src/app/models/Alert';
import { selectAlert } from '../state/shared.selectors';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  alerts$: Observable<Alert>

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.alerts$ = this.store.select(selectAlert)
    this.alerts$.subscribe(alert =>
      this.alerts.push(alert)
    )
  }




  alerts: any[] = [{
    type: 'success',
    msg: `Well done! You successfully read this important alert message. (added: ${new Date().toLocaleTimeString()})`,
    timeout: 5000
  }];

  add(): void {
    this.alerts.push({
      type: 'info',
      msg: `This alert will be closed in 5 seconds (added: ${new Date().toLocaleTimeString()})`,
      timeout: 5000
    });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

}
