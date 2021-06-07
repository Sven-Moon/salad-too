import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as ItemActions from './item.actions';



@Injectable()
export class ItemEffects {

  loadItems$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(ItemActions.loadItems),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => ItemActions.loadItemsSuccess({ data })),
          catchError(error => of(ItemActions.loadItemsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
