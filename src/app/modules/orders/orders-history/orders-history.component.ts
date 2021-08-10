import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredients } from 'src/app/models/Ingredient';
import { Order, Orders } from 'src/app/models/Order';
import { selectIngredientWithPrice } from '../../order/state/staticData/static-data.selectors';
import { selectClosedOrders, selectOpenOrders, selectOrders } from '../state/orders.selectors';

interface Visible {
  [id: string]: {
    itemsVisible: boolean,
    items: {
      [itemId: string]: {
        ingredientsVisible: boolean
      }
    },
  }
}

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss']
})
export class OrdersHistoryComponent implements OnInit {
  closedOrders: Orders
  allIngredients: Ingredients
  visible: Visible = {}

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.select(selectClosedOrders).subscribe(closedOrders =>
      this.closedOrders = closedOrders.slice().reverse()
    )
    // used to look up item ingredients lists
    this.store.select(selectIngredientWithPrice).subscribe(allIngredients =>
      this.allIngredients = allIngredients
    )

    // set the visible object orders & items all to false
    this.closedOrders.forEach(order => {
      this.visible[order.id] = {
        itemsVisible: false,
        items: {}
      }
      // set item ingredients to collapsed
      order.items.forEach(item =>
        this.visible[order.id].items[item.id] = {
          ingredientsVisible: false
        }
      )
    })

  }

  /**
   * calcStatusClass
   * returns status + <status> to template status indicator
   */
  public calcStatusClass(status: string): string {
    let classes: string = "status "
    switch (status) {
      case "Refunded":
        classes = classes.concat("refunded")
        break;
      case "Cancelled":
        classes = classes.concat("cancelled")
        break;
      case "Delivered":
        classes = classes.concat("delivered")
        break;
      default:
        break;
    }
    return classes

  }

  public toggleItemsVisible(id: string): void {
    this.visible[id].itemsVisible = !this.visible[id].itemsVisible
  }

  public toggleIngredientsVisible(id: string, itemId: string): void {
    this.visible[id].items[itemId].ingredientsVisible
      = !this.visible[id].items[itemId].ingredientsVisible
  }


}
