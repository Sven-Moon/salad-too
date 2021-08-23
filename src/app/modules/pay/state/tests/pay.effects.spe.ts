import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PayEffects } from '../pay.effects';

describe('PayEffects', () => {
  let actions$: Observable<any>;
  let effects: PayEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PayEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PayEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
