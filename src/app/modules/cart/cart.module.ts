import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { CartLaunchComponent } from './cart-launch/cart-launch.component';
import { CartTypeSelectComponent } from './cart-type-select/cart-type-select.component';
import { CartItemSelectComponent } from './cart-item-select/cart-item-select.component';
import { CartCustomizeItemComponent } from './cart-customize-item/cart-customize-item.component';


@NgModule({
  declarations: [
    CartComponent,
    CartViewComponent,
    CartLaunchComponent,
    CartTypeSelectComponent,
    CartItemSelectComponent,
    CartCustomizeItemComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
