import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner.routing';
import { OwnerComponent } from './owner/owner.component'
import { OwnerPickComponent } from './owner-pick/owner-pick.component';
import { OwnerAddComponent } from './owner-add/owner-add.component';


@NgModule({
  declarations: [
    OwnerComponent,
    OwnerPickComponent,
    OwnerAddComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule
  ]
})
export class OwnerModule { }
