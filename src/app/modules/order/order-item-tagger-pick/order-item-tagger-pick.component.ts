import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contacts } from 'src/app/models/User';
import { selectUserContacts } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-order-item-tagger-pick',
  templateUrl: './order-item-tagger-pick.component.html',
  styleUrls: ['./order-item-tagger-pick.component.scss']
})
export class OrderItemTaggerPickComponent implements OnInit {
  pickContactFlag: boolean
  contacts$: Observable<string[]>

  contacts: Contacts = [
    {
      id: "abc111",
      name: "Jim Bob",
      phoneNumber: "978-231-1121",
      img: './assets/images/profile_1.png'
    },
    {
      id: "abc114",
      name: "James Bob",
      phoneNumber: "978-231-1121",
      img: './assets/images/profile_1.png'
    },
    {
      id: "abc115",
      name: "Jane Bob",
      phoneNumber: "978-231-1121",
      img: './assets/images/profile_1.png'
    },
  ]
  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.contacts$ = this.store.select(selectUserContacts)
  }

  openPickContact() {
    this.pickContactFlag = true;
  }

  setProfileTag() {
    this.pickContactFlag = false
  }

}
