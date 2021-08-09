import { Injectable } from '@angular/core';
import { AlertService } from '@full-fledged/alerts';
import { Actions, createEffect } from '@ngrx/effects';
import { BsModalService } from 'ngx-bootstrap/modal';



@Injectable()
export class AlertEffects {



  constructor(
    private actions$: Actions,
    private modalService: BsModalService,
    private alertService: AlertService,
  ) { }



}
