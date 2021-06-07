import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadStaticData } from '../state/staticData/static-data.actions';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadStaticData())
  }

}
