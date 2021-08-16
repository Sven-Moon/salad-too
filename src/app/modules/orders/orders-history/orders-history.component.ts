import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredients } from 'src/app/models/Ingredient';
import { Order, Orders } from 'src/app/models/Order';
import { Visible } from 'src/app/models/Visible';
import { NavService } from 'src/app/services/nav.service';
import { selectIngredientWithPrice } from '../../order/state/staticData/static-data.selectors';
import { toggleOrderFavorite } from '../state/orders.actions';
import { selectClosedOrders, selectFavoriteOrders, selectOpenOrders, selectOrders } from '../state/orders.selectors';


@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss'],
  animations: [
    trigger('toggleIngredientView', [
      state('open', style({
        height: 0,
        'padding-top': 0,
        'padding-bottom': 0
      })),
      state('closed', style({})),
      transition('closed => open, open => closed', [
        animate('.3s')
      ])
    ])
  ]
})
export class OrdersHistoryComponent implements OnInit {
  closedOrders: Orders
  favoriteOrders: Orders
  allIngredients: Ingredients
  visible: Visible = {}

  constructor(
    private store: Store,
    private navService: NavService
  ) { }

  ngOnInit(): void {
    this.navService.updateNavPosition()
    // closed orders: those in 'delivered status (reverse chronological)
    this.store.select(selectClosedOrders).subscribe(closedOrders =>
      this.closedOrders = closedOrders.slice().reverse()
    )
    this.store.select(selectFavoriteOrders).subscribe(favorites =>
      this.favoriteOrders = favorites
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

  public toggleFavorite(id: string) {
    this.store.dispatch(toggleOrderFavorite({ id }))
  }

}
