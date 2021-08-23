import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { StaticDataEffects } from '../static-data.effects';

describe('StaticDataEffects', () => {
  let actions$: Observable<any>;
  let effects: StaticDataEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StaticDataEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(StaticDataEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
