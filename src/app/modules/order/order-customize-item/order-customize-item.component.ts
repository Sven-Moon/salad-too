import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Ingredient, Ingredients, IngredientType, IngredientTypes } from 'src/app/models/Ingredient';
import { CartItem } from 'src/app/models/Item';
import { Contact } from 'src/app/models/User';
import { addItemToCart } from '../state/cart/cart.actions';
import { selectLastItemOwner } from '../state/cart/cart.selectors';
import { clearItem, deselectAllIngredientsOfType, filterIngredientType, setLastItemOwnerAsItemOwner, setItemId, toggleIngredient } from '../state/item/item.actions';
import { selectCurrentItem, selectFilteredIngredientsByType, selectItemGroupTypes, selectItemIngredients, selectItemPrice, selectPickedIngredientType, selectSingleSelectIngredientTypes } from '../state/item/item.selectors';
import { selectIngredients } from '../state/staticData/static-data.selectors';

@Component({
  selector: 'app-order-customize-item',
  templateUrl: './order-customize-item.component.html',
  styleUrls: ['./order-customize-item.component.scss']
})
export class OrderCustomizeItemComponent implements OnInit {
  itemIngredients$: Observable<Ingredients>
  ingredientTypes$: Observable<IngredientTypes>
  typeFilter$: Observable<IngredientType>
  filteredIngredients$: Observable<Ingredients>
  singleSelectIngredientTypes: IngredientTypes
  cartItem: CartItem
  price: string
  owner: Contact

  //debug
  index = 0

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itemIngredients$ = this.store.select(selectItemIngredients)
    this.ingredientTypes$ = this.store.select(selectItemGroupTypes)
    this.filteredIngredients$ = this.store.select(selectFilteredIngredientsByType)
    this.typeFilter$ = this.store.select(selectPickedIngredientType)
    this.store.select(selectSingleSelectIngredientTypes).subscribe(types =>
      this.singleSelectIngredientTypes = types
    )
    // // start the owner as the last item owner
    // this.store.select(selectLastItemOwner).subscribe(owner =>
    //   this.owner = owner
    // )
    // this.store.dispatch(setLastItemOwnerAsItemOwner({ owner: this.owner }))

    this.store.select(selectItemPrice).subscribe(price =>
      this.price = price
    )
    this.store.select(selectCurrentItem).subscribe(currentItem =>
      this.cartItem = currentItem
    )

  }

  public updateFilter(ingredientType: string): void {
    this.store.dispatch(filterIngredientType({ ingredientType }))
  }

  public toggleIngredient(ingredient: Ingredient): void {
    // if ingredient type is on the single type list
    if (this.singleSelectIngredientTypes.find(type => type.id === ingredient.type)) {
      // nuke all of the ingredients from the item list (ids)
      let ingredientsToRemove: string[] = []
      this.store.select(selectIngredients).subscribe(itemIngredients => {
        itemIngredients.forEach(itemIngredient => {
          if (itemIngredient.type === ingredient.type) {
            ingredientsToRemove.push(itemIngredient.id)
          }
        })
      })
      this.store.dispatch(deselectAllIngredientsOfType({
        ingredientsToRemove
      }))
    }
    this.store.dispatch(toggleIngredient({ ingredient: ingredient.id }))
  }

  public addItemToCart(): void {
    let cartItem: CartItem = { ...this.cartItem }
    if (this.cartItem.quantity == null) {
      cartItem.quantity = 1
    }
    this.store.dispatch(addItemToCart({ cartItem }))

    // clear item by setting id to null
    this.store.dispatch(setItemId({ id: null }))
    this.router.navigate(['/order/cart'])
    this.store.dispatch(clearItem())
  }

  public cancelItem(): void {

  }

  calcClasses(ingredient: Ingredient): string {

    let type = ingredient.type + "-border"
    let classes: string = 'ingredient center-text ';
    classes = classes.concat(type)

    let isSelected: boolean = false
    let result = this.itemIngredients$.subscribe(
      itemIngredients => itemIngredients.forEach(
        itemIngredient => {
          if (itemIngredient.id === ingredient.id) {
            isSelected = true
          }
        }
      )
    )
    if (isSelected) {
      classes = classes.concat(" selected")
    } else {
      classes = classes.concat(" " + ingredient.type)
    }

    return classes

  }
}
