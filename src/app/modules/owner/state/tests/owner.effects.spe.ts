import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { OwnerEffects } from '../owner.effects';

describe('OwnerEffects', () => {
  let actions$: Observable<any>;
  let effects: OwnerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OwnerEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(OwnerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
