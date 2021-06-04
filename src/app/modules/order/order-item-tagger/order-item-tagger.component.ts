import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-item-tagger',
  templateUrl: './order-item-tagger.component.html',
  styleUrls: ['./order-item-tagger.component.scss']
})
export class OrderItemTaggerComponent implements OnInit {
  itemType$: Observable<string>
  selectProfileFlag: boolean
  addProfileFlag: boolean

  constructor() { }

  ngOnInit(): void {
  }

  selectProfileTag() {
    this.selectProfileFlag = true;
  }

}
