import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Ingredient, Ingredients } from 'src/app/models/Ingredient';
import { CartItem, CartItems, ItemsByOwner } from 'src/app/models/Item';
import { Contacts } from 'src/app/models/User';
import { PayInfoComponent } from '../../pay/pay-info/pay-info.component';
import { changeCartItemQty, clearCart, duplicateCartItem, removeCartItem } from '../state/cart/cart.actions';
import { selectCartItems, selectCartState, selectCartTotal, selectItemOwners, selectItemsByOwner } from '../state/cart/cart.selectors';
import { editCartItem } from '../state/item/item.actions';
import { selectIngredientWithPrice } from '../state/staticData/static-data.selectors';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.scss']
})
export class OrderCartComponent implements OnInit {
  // cartItems$: Observable<CartItems>
  cartItems: CartItems
  ingredients: Ingredients
  allIngredients: Ingredients
  cartIngredients: { [key: string]: Ingredients } = {}
  removeWarningFlag: boolean = false
  itemsByOwner: ItemsByOwner
  itemOwners: Contacts
  itemsVisible: { [id: string]: { visible: boolean } } = {}
  cartTotal$: Observable<number>
  bsModalRef: BsModalRef

  constructor(
    private store: Store,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.store.select(selectCartItems).subscribe(items =>
      this.cartItems = items
    )
    // used to look up item ingredients lists
    this.store.select(selectIngredientWithPrice).subscribe(allIngredients =>
      this.allIngredients = allIngredients
    )
    // each item starts with empty ingredients listing
    // as View is toggled, this will be populated (then cleared)
    this.cartItems.forEach(item =>
      this.cartIngredients[item.name] = []
    )
    // used to organize the items by owner
    this.store.select(selectItemsByOwner).subscribe(items =>
      this.itemsByOwner = items
    )
    // this.itemOwners$ = this.store.select(selectItemOwners)
    this.store.select(selectItemOwners).subscribe(owners =>
      this.itemOwners = owners
    )
    this.itemOwners.forEach(owner =>
      this.itemsVisible[owner.email] = { visible: true }
    )
    this.cartTotal$ = this.store.select(selectCartTotal)


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

  public showDetails(name: string, ingredients: string[]) {
    // if the item already exits, it's currently showing its ingredients
    if (this.cartIngredients[name].length != 0) {
      this.cartIngredients[name] = []
    } else {// for each ingredient in the list
      // this.ids.push(name)
      ingredients.forEach((itemIngredient: string) =>
        // return an Ingredient as an object inserted to a list under
        // the item ID
        this.cartIngredients[name].push(
          this.allIngredients.find((ingredient: Ingredient) =>
            ingredient.id === itemIngredient
          )
        )
      )
    }
  }

  public duplicateItem(itemToDuplicate: CartItem) {
    let item = {
      ...itemToDuplicate,
      id: itemToDuplicate.id.concat('*')
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

}
