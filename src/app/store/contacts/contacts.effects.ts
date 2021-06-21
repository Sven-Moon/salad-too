import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as ContactsActions from './contacts.actions';



@Injectable()
export class ContactsEffects {

  loadContacts$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ContactsActions.loadContacts),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => ContactsActions.loadContactsSuccess({ data })),
          catchError(error => of(ContactsActions.loadContactsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) { }

}
