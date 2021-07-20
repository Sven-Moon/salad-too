import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { CartItems, ItemsByOwner } from 'src/app/models/Item';
import { Payment } from 'src/app/models/Payment';
import { Contacts } from 'src/app/models/User';
import { selectCartItems } from '../../order/state/cart/cart.selectors';
import { PayInfoComponent } from '../pay-info/pay-info.component';
import { updateIsSelected, updateItemOwners, updateItemsByOwner, updatePayment } from '../state/pay.actions';
import { selectItemOwners, selectItemOwnersFromCart, selectItemsByOwner, selectItemsByOwnerFromCart, selectPayment, selectUserPayTotal } from '../state/pay.selectors';

@Component({
  selector: 'app-pay-choose',
  templateUrl: './pay-choose.component.html',
  styleUrls: ['./pay-choose.component.scss']
})
export class PayChooseComponent implements OnInit {
  itemsByOwner: ItemsByOwner
  itemOwners: Contacts
  itemOwners$: Observable<Contacts>
  payTotal: number = 0
  itemsVisible: { [id: string]: { visible: boolean } } = {}
  payment: Payment
  bsModalRef: BsModalRef

  constructor(
    private store: Store,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {

    // TODO: update itemsbyowner from cart
    this.updateFromCart()

    this.store.select(selectItemsByOwner).subscribe(items =>
      this.itemsByOwner = items
    )
    // this.itemOwners$ = this.store.select(selectItemOwners)
    this.store.select(selectItemOwners).subscribe(owners =>
      this.itemOwners = owners
    )
    this.itemOwners.forEach(owner => {
      if (this.itemsByOwner[owner.email].isSelected)
        this.payTotal += this.itemsByOwner[owner.email].total
    })
    this.store.dispatch(updateItemsByOwner({
      entities: this.itemsByOwner,
      ids: this.itemOwners
    }))
    this.itemOwners.forEach(owner =>
      this.itemsVisible[owner.email] = { visible: false }
    )
    this.store.select(selectPayment).subscribe(payment =>
      this.payment = payment
    )
  }

  public viewOwnerItems(id: string): void {
    this.itemsVisible[id].visible = true
  }

  public hideOwnerItems(id: string): void {
    this.itemsVisible[id].visible = false
  }

  public togglePaySelect(id: string): void {
    if (this.itemsByOwner[id].isSelected) {
      this.store.dispatch(updateIsSelected({ id, selected: false }))
    } else {
      this.store.dispatch(updateIsSelected({ id, selected: true }))
    }
    this.updatePayment()
  }

  public updatePayment() {
    let newTotal: number = 0
    let newPayment: Payment
    let selectedOwners: string[] = []
    this.itemOwners.forEach(owner => {
      if (this.itemsByOwner[owner.email].isSelected) {
        newTotal += this.itemsByOwner[owner.email].total
        selectedOwners.push(owner.email)
      }
    })
    newPayment = {
      ...this.payment,
      amount: newTotal,
      ownerSet: selectedOwners
    }
    this.store.dispatch(updatePayment({ payment: newPayment }))
  }

  public calcClassSelected(id: string): string {
    return this.itemsByOwner[id].isSelected
      ? "owner selected"
      : "owner unselected"
  }

  public pureName(name: string): string {
    return name.split(' ').splice(1, 10).
      join(' ')
  }

  public paySelectedTotal(): void {
    this.bsModalRef = this.modalService.show(PayInfoComponent, { id: 120 })
  }

  private updateFromCart() {
    let ids: Contacts
    let entities
    this.store.select(selectItemsByOwnerFromCart).subscribe(items =>
      entities = items
    )
    this.store.select(selectItemOwnersFromCart).subscribe(owners =>
      ids = owners
    )

    this.store.dispatch(updateItemsByOwner({ entities, ids }))
  }

  //#region Dev Sample Data
  // this.itemOwners = [
  //   {
  //     email: "DougBerman@npr.com",
  //     img: "./assets/images/profile_1.png",
  //     name: "Doug"
  //   },
  //   {
  //     email: "MikeDanforth@npr.com",
  //     img: "./assets/images/profile_1.png",
  //     name: "Mike Danforth"
  //   },
  //   {
  //     email: "guest98641564@saladtoo.com",
  //     img: "./assets/images/profile_1.png",
  //     name: "Guest 98641564"
  //   }
  // ]
  // this.itemsByOwner = {
  //   "DougBerman@npr.com": {
  //     isPaid: false,
  //     isSelected: false,
  //     items: [
  //       {
  //         id: "cobb",
  //         img: "./assets/images/recipes/cobb.png",
  //         ingredients: [
  //           "ham",
  //           "turkey",
  //           "mixed_greens",
  //           "tomatoes",
  //           "cheddar",
  //           "cucumbers",
  //           "ranch",
  //           "onions"
  //         ],
  //         itemGroup: "salad",
  //         name: "Doug's Cobb Salad",
  //         owner: {
  //           email: "DougBerman@npr.com",
  //           img: "./assets/images/profile_1.png",
  //           name: "Doug"
  //         },
  //         price: "14.20",
  //         quantity: 1,
  //         type: undefined
  //       },
  //       {
  //         id: "cremeBrulee",
  //         img: "./assets/images/desserts/cremeBrulee",
  //         itemGroup: "dessert",
  //         name: "Doug's Creme Brulee",
  //         owner: {
  //           email: "DougBerman@npr.com",
  //           img: "./assets/images/profile_1.png",
  //           name: "Doug"
  //         },
  //         price: "5.45",
  //         quantity: 1,
  //       }
  //     ],
  //     owner: {
  //       email: "DougBerman@npr.com",
  //       img: "./assets/images/profile_1.png",
  //       name: "Doug"
  //     },
  //     total: 19.65,
  //     viewItems: false
  //   },
  //   "MikeDanforth@npr.com": {
  //     isPaid: false,
  //     isSelected: false,
  //     items: [
  //       {
  //         id: "mac-cheese",
  //         img: "./assets/images/sides/mac-cheese.png",
  //         itemGroup: "side",
  //         name: "Mike's Mac & cheese",
  //         owner: {
  //           email: "MikeDanforth@npr.com",
  //           img: "./assets/images/profile_1.png",
  //           name: "Mike Danforth"
  //         },
  //         price: "3.95",
  //         quantity: 3
  //       }
  //     ],
  //     owner: {
  //       email: "MikeDanforth@npr.com",
  //       img: "./assets/images/profile_1.png",
  //       name: "Mike Danforth"
  //     },
  //     total: 3.95,
  //     viewItems: false,
  //   },
  //   "guest98641564@saladtoo.com": {
  //     isPaid: true,
  //     isSelected: false,
  //     items: [{
  //       id: "ham_sourdough",
  //       img: "./assets/images/recipes/ham_sourdough.png",
  //       ingredients: [
  //         "ham",
  //         "sourdough",
  //         "cheddar"
  //       ],
  //       itemGroup: "sandwich",
  //       name: "Guest's Ham on Sourdough",
  //       owner: {
  //         email: "guest98641564@saladtoo.com",
  //         img: "./assets/images/profile_1.png",
  //         name: "Guest 98641564"
  //       },
  //       price: "8.20",
  //       quantity: 3,
  //       type: undefined,
  //     },
  //     {
  //       id: "coke",
  //       img: "./assets/images/drinks/coke.png",
  //       itemGroup: "drink",
  //       name: "Guest's Coke",
  //       owner: {
  //         email: "guest98641564@saladtoo.com",
  //         img: "./assets/images/profile_1.png",
  //         name: "Guest 98641564"
  //       },
  //       price: "2.25",
  //       quantity: 1,
  //       type: "soda"
  //     }],
  //     owner: {
  //       email: "guest98641564@saladtoo.com",
  //       img: "./assets/images/profile_1.png",
  //       name: "Guest 98641564"
  //     },
  //     total: 10.45,
  //     viewItems: false
  //   }
  // }
  //#endregion sample data

}
