import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Ingredient, Ingredients } from 'src/app/models/Ingredient';
import { CartItem, CartItems, ItemsByOwner } from 'src/app/models/Item';
import { Contact, Contacts } from 'src/app/models/Contact';
import { NavService } from 'src/app/services/nav.service';
import { OrderService } from 'src/app/services/order.service';
import { PayInfoComponent } from '../../pay/pay-info/pay-info.component';
import { changeCartItemQty, clearCart, duplicateCartItem, removeCartItem, updateCartItemOwner } from '../state/cart/cart.actions';
import { selectCartItems, selectCartTotal, selectItemOwners, selectItemsByOwner, selectPossibleItemOwners } from '../state/cart/cart.selectors';
import { editCartItem } from '../state/item/item.actions';
import { selectIngredientWithPrice } from '../state/staticData/static-data.selectors';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.scss'],
  animations: [
    trigger('toggleIngredientView', [
      state('closed', style({
        height: '0px',
        'padding-top': '0px',
        'padding-bottom': '0px'
      })),
      state('open', style({

      })),
      transition('closed => open, open => closed', [
        animate('.3s')
      ])
    ])
  ],
  providers: [{
    provide: BsDropdownConfig, useValue: {
      isAnimated: true,
      autoClose: true
    }
  }]
})
export class OrderCartComponent implements OnInit {
  // cartItems$: Observable<CartItems>
  cartItems: CartItems
  ingredients: Ingredients
  allIngredients: Ingredients
  cartIngredients: {
    [key: string]: {
      visible: boolean,
      ingredients: Ingredients
    }
  } = {}
  removeWarningFlag: boolean = false
  itemsByOwner: ItemsByOwner
  itemOwners: Contacts
  itemsVisible: { [id: string]: { visible: boolean } } = {}
  cartTotal$: Observable<number>
  bsModalRef: BsModalRef
  allOwners$: Observable<Contacts>

  constructor(
    private store: Store,
    private router: Router,
    private modalService: BsModalService,
    private orderService: OrderService,
    private navService: NavService,
  ) { }

  ngOnInit(): void {
    this.navService.updateNavPosition()
    this.store.select(selectCartItems).subscribe(items =>
      this.cartItems = items
    )
    // used to look up item ingredients lists
    this.store.select(selectIngredientWithPrice).subscribe(allIngredients =>
      this.allIngredients = allIngredients
    )
    // create an items object with the full ingredient and visibility setting
    this.cartItems.forEach(item => {
      // create an ingredient object based on ingredient strings
      let itemIngredients: Ingredients = []
      if (item.ingredients) {
        item.ingredients.forEach(itemIngredient =>
          itemIngredients.push(
            this.allIngredients.find(
              (ingredient: Ingredient) => ingredient.id === itemIngredient
            )
          )
        )
        // set each item visibility to false and assign ingredient object array
        this.cartIngredients[item.name] = {
          visible: false,
          ingredients: itemIngredients
        }
      }
    })
    // used to organize the items by owner
    this.store.select(selectItemsByOwner).subscribe(items =>
      this.itemsByOwner = items
    )
    this.store.select(selectItemOwners).subscribe(owners =>
      this.itemOwners = owners
    )
    this.itemOwners.forEach(owner =>
      this.itemsVisible[owner.email] = { visible: true }
    )
    this.cartTotal$ = this.store.select(selectCartTotal)
    // contacts & user are used for owner select dropdowns
    this.allOwners$ = this.store.select(selectPossibleItemOwners)

  }

  public viewOwnerItems(id: string): void {
    this.itemsVisible[id].visible = true
  }

  public hideOwnerItems(id: string): void {
    this.itemsVisible[id].visible = false
  }

  public editCartItem(id: string) {
    let item: CartItem
    item = this.cartItems.find(item => item.id === id)
    this.store.dispatch(editCartItem({ item }))
    this.store.dispatch(removeCartItem({ id }))
    this.router.navigate(['/order/customize'])
  }

  public showDetails(name: string) {
    // toggle the visibility flag for the passed item
    this.cartIngredients[name].visible = !this.cartIngredients[name].visible

  }

  public duplicateItem(itemToDuplicate: CartItem) {
    let item = {
      ...itemToDuplicate,
      id: this.orderService.generateItemId(itemToDuplicate.id)
    }
    this.store.dispatch(duplicateCartItem({ item }))
  }

  public removeItem(id: string) {
    this.store.dispatch(removeCartItem({ id }))
  }

  public clearCartItems() {
    this.store.dispatch(clearCart())
    setTimeout(() => {
      this.router.navigate(['/order/launch'])
    }, 750);
  }

  public increaseCartItemQty(oldItem: CartItem) {
    let item = { ...oldItem, quantity: oldItem.quantity + 1 }
    this.store.dispatch(changeCartItemQty({ item }))
  }

  public decreaseCartItemQty(oldItem: CartItem) {
    let item = { ...oldItem, quantity: oldItem.quantity - 1 }
    if (item.quantity == 0) {
      this.removeWarningFlag = true
      setTimeout(() => {
        this.removeWarningFlag = false
      }, 3000);
    } else {
      this.store.dispatch(changeCartItemQty({ item }))
    }
  }

  public pay(): void {
    this.bsModalRef = this.modalService.show(PayInfoComponent, { id: 120 })
  }

  public collapseAll(): void {
    Object.keys(this.itemsVisible).forEach((key) => {
      this.itemsVisible[key] = { visible: false }
    })
  }

  public expandAll(): void {
    Object.keys(this.itemsVisible).forEach((key) => {
      this.itemsVisible[key] = { visible: true }
    })
  }

  public shortName(name: string): string {
    return name.split(' ')[0]
  }

  // public changeOwner(oldItem: CartItem, owner: Contact): void {
  public changeOwner(oldItem: CartItem, e: any): void {
    let owner: Contact
    let contactEmail = e.target.selectedOptions[0].value
    this.allOwners$.subscribe(contacts =>
      owner = contacts.find(contact => contact.email === contactEmail)
    )
    let item = { ...oldItem, owner: owner }
    this.store.dispatch(updateCartItemOwner({ item }))

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/order/cart']);
    });
  }

}
