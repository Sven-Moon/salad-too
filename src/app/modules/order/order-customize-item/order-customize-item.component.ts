import { R3TargetBinder } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isEqualCheck } from '@ngrx/store/src/selector';
import { Observable } from 'rxjs/internal/Observable';
import { Ingredient, Ingredients, IngredientType, IngredientTypes } from 'src/app/models/Ingredient';
import { CartItem, Item } from 'src/app/models/Item';
import { addItemToCart } from '../state/cart/cart.actions';
import { clearItem, deselectAllIngredientsOfType, filterIngredientType, setItemId, toggleIngredient } from '../state/item/item.actions';
import { initialState } from '../state/item/item.reducer';
import { selectCurrentItem, selectFilteredIngredientsByType, selectItemId, selectItemIngredients, selectPickedIngredientType, selectSingleSelectIngredientTypes } from '../state/item/item.selectors';
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
  singleSelectIngredientTypes: IngredientTypes

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
    this.store.select(selectSingleSelectIngredientTypes).subscribe(types =>
      this.singleSelectIngredientTypes = types
    )

    // // debug

  }

  public updateFilter(ingredientType: string): void {
    this.store.dispatch(filterIngredientType({ ingredientType }))
  }

  public toggleIngredient(ingredient: Ingredient): void {
    // if ingredient type is on the single type list
    this.singleSelectIngredientTypes.forEach(type => console.log(type.id))
    if (this.singleSelectIngredientTypes.find(type => type.id === ingredient.type)) {
      // nuke all of the ingredients from the item list (ids)
      let ingredientsToRemove: string[] = []
      this.store.select(selectIngredients).subscribe(itemIngredients => {
        itemIngredients.forEach(itemIngredient => {
          console.log(itemIngredient.type + 'vs' + ingredient.type)
          if (itemIngredient.type === ingredient.type) {
            console.log('True')
            ingredientsToRemove.push(itemIngredient.id)
          }
        })
      })
      console.log('List of ingredients to remove: ')
      ingredientsToRemove.forEach(id =>
        console.log(id)
      )
      this.store.dispatch(deselectAllIngredientsOfType({
        ingredientsToRemove
      }))
    }
    this.store.dispatch(toggleIngredient({ ingredient: ingredient.id }))
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
