import * as fromOwner from '../owner.reducer';
import { selectOwnerState } from '../owner.selectors';

describe('Owner Selectors', () => {
  it('should select the feature state', () => {
    const result = selectOwnerState({
      [fromOwner.ownerFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
