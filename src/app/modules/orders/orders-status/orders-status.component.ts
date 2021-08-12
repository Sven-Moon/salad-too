import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredients } from 'src/app/models/Ingredient';
import { Order, Orders } from 'src/app/models/Order';
import { NavService } from 'src/app/services/nav.service';
import { selectIngredientWithPrice } from '../../order/state/staticData/static-data.selectors';
import { selectClosedOrders, selectOpenOrders, selectOrders } from '../state/orders.selectors';
import { Visible } from 'src/app/models/Visible'

@Component({
  selector: 'app-orders-status',
  templateUrl: './orders-status.component.html',
  styleUrls: ['./orders-status.component.scss']
})
export class OrdersStatusComponent implements OnInit {
  openOrders: Orders
  allIngredients: Ingredients
  visible: Visible = {}

  constructor(
    private store: Store,
    private navService: NavService
  ) { }

  ngOnInit(): void {
    this.navService.updateNavPosition()
    this.store.select(selectOpenOrders).subscribe(openOrders =>
      this.openOrders = openOrders
    )
    // used to look up item ingredients lists
    this.store.select(selectIngredientWithPrice).subscribe(allIngredients =>
      this.allIngredients = allIngredients
    )

    // set the visible object orders & items all to false
    this.openOrders.forEach(order => {
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
   */
  public calcStatusClass(status: string): string {
    let classes: string = "status "
    switch (status) {
      case "Paid":
        classes = classes.concat("paid")
        break;
      case "Making":
        classes = classes.concat("making")
        break;
      case "Ready":
        classes = classes.concat("ready")
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
