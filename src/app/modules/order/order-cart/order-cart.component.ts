import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient, Ingredients } from 'src/app/models/Ingredient';
import { CartItem, CartItems } from 'src/app/models/Item';
import { clearCart, removeCartItem } from '../state/cart/cart.actions';
import { selectCartItems, selectCartState } from '../state/cart/cart.selectors';
import { editCartItem } from '../state/item/item.actions';
import { selectIngredientWithPrice } from '../state/staticData/static-data.selectors';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.scss']
})
export class OrderCartComponent implements OnInit {
  cartItems$: Observable<CartItems>
  cartItems: CartItems
  ingredients: Ingredients
  allIngredients: Ingredients
  cartIngredients: { [key: string]: Ingredients } = {}

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartItems$ = this.store.select(selectCartItems)
    this.store.select(selectCartState).subscribe(state =>
      this.cartItems = state.items
    )
    this.store.select(selectIngredientWithPrice).subscribe(allIngredients =>
      this.allIngredients = allIngredients
    )


    this.cartItems = [
      {
        id: 'ham_sourdough',
        name: 'Ham on Sourdough',
        itemGroup: 'sandwich',
        img: './assets/images/recipes/ham_sourdough.png',
        ingredients: [
          'ham',
          'sourdough',
          'cheddar'
        ],
        price: '8.20',
        owner: {
          email: 'guest31974538@saladtoo.com',
          img: './assets/images/profile_1.png',
          name: 'Guest 31974538'
        },
        quantity: '1'
      },
      {
        id: 'cobb',
        name: 'Cobb Salad',
        itemGroup: 'salad',
        img: './assets/images/recipes/cobb.png',
        ingredients: [
          'ham',
          'turkey',
          'mixed_greens',
          'tomatoes',
          'cheddar',
          'cucumbers',
          'ranch'
        ],
        price: '14.20',
        owner: {
          email: 'guest31974538@saladtoo.com',
          img: './assets/images/profile_1.png',
          name: 'Guest 31974538'
        },
        quantity: '1'
      }
    ]
    this.cartItems.forEach(item =>
      this.cartIngredients[item.name] = []
    )
  }

  public editCartItem(name: string) {
    let item: CartItem
    item = this.cartItems.find(item => item.name === name)
    this.store.dispatch(editCartItem({ item }))
    this.store.dispatch(removeCartItem({ name }))
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

  public duplicateItem() {

  }

  public removeItem(name: string) {
    this.store.dispatch(removeCartItem({ name }))
  }

  public clearCartItems() {
    this.store.dispatch(clearCart())
    this.router.navigate(['/order/launch'])
  }


}
