import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-type-select',
  templateUrl: './order-type-select.component.html',
  styleUrls: ['./order-type-select.component.scss']
})
export class OrderTypeSelectComponent implements OnInit {
  pickContactFlag: boolean
  addContactFlag: boolean

  constructor() { }

  ngOnInit(): void {
    this.pickContactFlag = false;
    this.addContactFlag = true;
  }

  closePickContact() {
    this.pickContactFlag = false;
  }


  addContactTag() {
    this.addContactFlag = true;
  }

  closeAddContact() {
    this.addContactFlag = false;
  }

}
