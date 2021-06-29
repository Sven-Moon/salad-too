import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Ingredients, IngredientType, IngredientTypes } from 'src/app/models/Ingredient';
import { Item } from 'src/app/models/Item';
import { filterIngredientType, toggleIngredient } from '../state/item/item.actions';
import { selectFilteredIngredientsByType, selectItemId, selectItemIngredients, selectPickedIngredientType } from '../state/item/item.selectors';
import { selectAllItems, selectIngredients, selectIngredientTypes } from '../state/staticData/static-data.selectors';

@Component({
  selector: 'app-order-customize-item',
  templateUrl: './order-customize-item.component.html',
  styleUrls: ['./order-customize-item.component.scss']
})
export class OrderCustomizeItemComponent implements OnInit {
  ingredients$: Observable<Ingredients>
  ingredientTypes$: Observable<IngredientTypes>
  pickedIngredientType$: Observable<IngredientType>
  filteredIngredients$: Observable<Ingredients>

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.ingredients$ = this.store.select(selectItemIngredients)
    this.ingredientTypes$ = this.store.select(selectIngredientTypes)
    this.filteredIngredients$ = this.store.select(selectFilteredIngredientsByType)
    this.pickedIngredientType$ = this.store.select(selectPickedIngredientType)

    // // debug

  }

  public updateFilter(ingredientType: string) {
    this.store.dispatch(filterIngredientType({ ingredientType }))
    this.store.select(selectPickedIngredientType).subscribe(type =>
      console.log('Type:' + type.id)
    )
    this.store.select(selectFilteredIngredientsByType).subscribe(ingredients =>
      ingredients.forEach(ingredient =>
        console.log('Type:' + ingredient.id))
    )
  }

  public toggleIngredient(ingredient: string) {
    this.store.dispatch(toggleIngredient({ ingredient }))
  }

  public addItemToCart() {

  }

  public cancelItem() {

  }

}
