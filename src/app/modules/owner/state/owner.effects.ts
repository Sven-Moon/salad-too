import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';

import * as OwnerActions from './owner.actions';


@Injectable()
export class OwnerEffects {


  loadOwners$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(OwnerActions.loadOwners),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });


  constructor(private actions$: Actions) { }

}
