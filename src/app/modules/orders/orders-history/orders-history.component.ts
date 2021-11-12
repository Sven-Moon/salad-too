import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '@full-fledged/alerts';
import { Store } from '@ngrx/store';
import { Ingredient, Ingredients } from 'src/app/models/Ingredient';
import { CartItems, Items } from 'src/app/models/Item';
import { Order, Orders } from 'src/app/models/Order';
import { Visible } from 'src/app/models/Visible';
import { NavService } from 'src/app/services/nav.service';
import { addItemToCart, clearCart } from '../../order/state/cart/cart.actions';
import { selectIngredientWithPrice } from '../../order/state/staticData/static-data.selectors';
import { toggleOrderFavorite } from '../state/orders.actions';
import { selectClosedOrders, selectFavoriteOrders, selectOpenOrders, selectOrders } from '../state/orders.selectors';


@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss'],
  animations: [
    trigger('toggleIngredientView', [
      state('closed', style({
        height: 0,
        'padding-top': 0,
        'padding-bottom': 0
      })),
      state('open', style({})),
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
    private navService: NavService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.navService.updateNavPosition()
    this.initSubscriptions()
  }

  private initSubscriptions() {
      // closed orders: those in 'delivered status (reverse chronological)
    this.store.select(selectClosedOrders).subscribe(closedOrders =>{
      this.closedOrders = closedOrders.slice().reverse()
      this.initVisibility(this.closedOrders)
    })
    this.store.select(selectFavoriteOrders).subscribe(favorites =>{
      this.favoriteOrders = favorites
      this.initVisibility(this.favoriteOrders)
    })
    // used to look up item ingredients lists
    this.store.select(selectIngredientWithPrice).subscribe(allIngredients =>
      this.allIngredients = allIngredients
    )
  }

  private initVisibility(orders:Orders) {
// set orders to collapsed
    orders.forEach(order => {
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

  public toggleFavorite(id: string):void {
    this.store.dispatch(toggleOrderFavorite({ id }))
  }

  public startFromOrder(id:string):void {
    let items:CartItems = this.closedOrders
    .find(order => id === order.id).items

    this.store.dispatch(clearCart())
    this.store.dispatch(clearCart())

    items.forEach(item => this.store
      .dispatch(addItemToCart({ cartItem: item })))

    this.alertService.info('Your order has been added to the cart!')
  }

}
