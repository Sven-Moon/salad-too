import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem, CartItems, Item, Items } from '../models/Item';
import { Contact, User } from '../models/User';
import { updateCartItemOwner, updateLastOwner } from '../modules/order/state/cart/cart.actions';
import { selectCartItems, selectCartItemsIds, selectLastItemOwner } from '../modules/order/state/cart/cart.selectors';
import { setItemOwner } from '../modules/order/state/item/item.actions';
import { selectAllItems } from '../modules/order/state/staticData/static-data.selectors';
import { AlertService } from '@full-fledged/alerts';
import { selectItemId } from '../modules/order/state/item/item.selectors';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private alertService: AlertService,
    private store: Store,
    private router: Router
  ) { }

  public processLoginSuccess(user: User) {
    // *********
    // processes all post login success items:
    // 1) alerts of success
    // 2) sets the user as the "lastOwner", which sets the next
    //    item to the last owner (also convenient to use in following task)[]
    // 3) converts guest items to User items
    // 3.1) if item in customization, adds User as owner property
    // 3.2) converts all items in cart (owner property & name)
    //
    let itemId: string
    this.store.select(selectItemId).subscribe(id =>
      itemId = id
    )
    let cartItems: CartItems
    this.store.select(selectCartItems).subscribe(items =>
      cartItems = items
    )
    // 1)
    this.alertService.success('You have successfully logged in!')
    // 2)
    this.setUserAsLastOwner(user)
    // 3.1)
    this.setItemOwner(itemId, user)
    // 3.2)
    this.convertGuestItems(cartItems, user)
  }

  //#region processLoginSuccess
  public setUserAsLastOwner(user: User) {
    this.store.dispatch(updateLastOwner({
      data: user
    }))
  }

  private setItemOwner(itemId: string, user: User) {
    if (itemId) {
      this.store.dispatch(setItemOwner({ owner: user }))
    }
  }

  public convertGuestItems(cartItems: CartItems, user: User) {
    // ****
    // method used on login & item owner change
    // depends on updateLastItemOwner to be executed upstream
    if (cartItems.length !== 0) {

      let owner: Contact
      this.store.select(selectLastItemOwner)

      cartItems.forEach(item => {
        let itemName: string = this.getOwnedItemName(item)
        let itemId = item.id

        this.store.dispatch(updateCartItemOwner({
          itemId,
          itemName,
          owner: owner
        }))
      });
    }
    // if the user is currently in the cart, the page must be reloaded
    // because the user list must be reloaded (on init)

    if (this.router.url === '/order/cart') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/order/cart']);
      });
    }
  }
  //#endregion processLoginSuccess

  public getOwnedItemName(item: Item): string {
    // **** Adds owner name to the item to show ownership ******
    // modifies items after they have been added to the cart
    // accounts for duplicate items, which art suffixed with 1+ '*'


    let allItems: Items
    this.store.select(selectAllItems).subscribe(items => allItems = items)

    // ========== Item Owner may have changed ==========
    // account for possibility that this is a duplicate item
    let pureId = item.id.split('__')[0]
    // get the name without modification
    let itemName: string = allItems.find(item => item.id == pureId).name
    // add (first name of) <contact name>'s before item name
    itemName = item.owner.name.split(' ')[0].concat('\'s ', itemName)

    return itemName
  }

  public generateItemId(itemId: string): string {
    let uniqueId: string = itemId
    let itemIds: string[]
    let counter: number = 1
    let unique: boolean = false
    this.store.select(selectCartItemsIds).subscribe(ids =>
      itemIds = ids
    )

    while (!unique) {
      uniqueId = itemId.concat("__", counter.toString())
      if (itemIds.includes(uniqueId)) {
        counter++
      } else { unique = true }
    }
    return uniqueId

  }

}