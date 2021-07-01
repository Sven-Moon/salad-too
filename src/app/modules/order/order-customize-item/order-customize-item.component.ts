import { R3TargetBinder } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isEqualCheck } from '@ngrx/store/src/selector';
import { Observable } from 'rxjs/internal/Observable';
import { Ingredient, Ingredients, IngredientType, IngredientTypes } from 'src/app/models/Ingredient';
import { CartItem, Item } from 'src/app/models/Item';
import { addItemToCart } from '../state/cart/cart.actions';
import { clearItem, filterIngredientType, setItemId, toggleIngredient } from '../state/item/item.actions';
import { initialState } from '../state/item/item.reducer';
import { selectCurrentItem, selectFilteredIngredientsByType, selectItemId, selectItemIngredients, selectPickedIngredientType } from '../state/item/item.selectors';
import { selectAllItems, selectIngredients, selectIngredientTypes } from '../state/staticData/static-data.selectors';

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

  //debug
  index = 0

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itemIngredients$ = this.store.select(selectItemIngredients)
    this.ingredientTypes$ = this.store.select(selectIngredientTypes)
    this.filteredIngredients$ = this.store.select(selectFilteredIngredientsByType)
    this.typeFilter$ = this.store.select(selectPickedIngredientType)

    // // debug

  }

  public updateFilter(ingredientType: string): void {
    this.store.dispatch(filterIngredientType({ ingredientType }))
  }

  public toggleIngredient(ingredient: string): void {
    this.store.dispatch(toggleIngredient({ ingredient }))
  }

  public addItemToCart(): void {
    let cartItem: CartItem
    this.store.select(selectCurrentItem).subscribe((currentItem: CartItem) =>
      cartItem = {
        ...currentItem,
        quantity: "1"
      }
    )
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
      itemIngredients => {
        // itemIngredients.forEach(ingredient => console.log('Ingredient: ' + ingredient.name))
        itemIngredients.forEach(
          itemIngredient => {
            if (itemIngredient.id === ingredient.id) {
              isSelected = true
            }
          }
        )
      }
    )
    if (isSelected) {
      classes = classes.concat(" selected")
    } else {
      classes = classes.concat(" " + ingredient.type)
    }

    return classes

  }
}
