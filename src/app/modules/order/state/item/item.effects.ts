import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as CartActions from '../cart/cart.actions';

import * as ItemActions from './item.actions';
import { Store } from '@ngrx/store';



@Injectable()
export class ItemEffects {

  updateLastItemOwner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.setItemOwner),
      mergeMap((action) => [this.store.dispatch(CartActions.updateLastOwner({ data: action.owner }))])
    ),
    { dispatch: false }
  )



  constructor(
    private actions$: Actions,
    private store: Store
  ) { }

}
