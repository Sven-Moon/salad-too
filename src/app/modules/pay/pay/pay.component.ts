import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItems, ItemsByOwner } from 'src/app/models/Item';
import { Contacts } from 'src/app/models/User';
import { selectItemOwners, selectItemsByOwner } from '../state/pay.selectors';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  itemsByOwner: ItemsByOwner
  itemOwners: Contacts
  visibleItems: string[]
  selectedAmount: number

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    // startup
    // itemsByOwner: {
    //   dave: {}
    //   pete: {}
    //   martha: {}
    // }

    this.store.select(selectItemOwners).subscribe(owners =>
      this.itemOwners = owners
    )
    this.store.select(selectItemsByOwner).subscribe(items =>
      this.itemsByOwner = items
    )

  }

  public viewOwnerItems(name: string) {
    this.visibleItems.push(name)
  }

}
