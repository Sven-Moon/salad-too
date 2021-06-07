import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as StaticDataActions from './static-data.actions';
import { StaticDataService } from 'src/app/services/static-data.service';



@Injectable()
export class StaticDataEffects {

  loadStaticData$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StaticDataActions.loadStaticData),
      mergeMap((action) =>
        this.service.getStaticData().pipe(
          map(data => StaticDataActions.loadStaticDataSuccess({ data })),
          catchError(error => of(StaticDataActions.loadStaticDataFailure({ error }))))
      )
    );
  });



  constructor(
    private actions$: Actions,
    private service: StaticDataService) { }

}
