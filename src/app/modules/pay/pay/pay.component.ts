import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  itemsByOwner$: Observable<ItemsByOwner>
  itemOwners$: Observable<Contacts>
  visibleItems: string[]
  selectedAmount: number

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    // dev info
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
    this.itemOwners$ = this.store.select(selectItemOwners)
    this.itemsByOwner$ = this.store.select(selectItemsByOwner)
    console.log("itemOwners: ")
    console.log(this.itemOwners)
    console.log("itemsByOwner: ")
    console.log(this.itemsByOwner)

  }

  public viewOwnerItems(id: string): void {
    this.itemsByOwner[id].viewItems = true
  }

  public hideOwnerItems(id: string): void {
    this.itemsByOwner[id].viewItems = false
  }

}
