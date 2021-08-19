import * as fromStaticData from '../static-data.reducer';
import { selectStaticDataState } from '../static-data.selectors';

describe('StaticData Selectors', () => {
  it('should select the feature state', () => {
    const result = selectStaticDataState({
      [fromStaticData.staticDataFeatureKey]: {}
    });

    // expect(result).toEqual({});
  });
});
