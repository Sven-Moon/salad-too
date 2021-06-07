import * as fromStaticData from '../static-data.reducer';
import { selectStaticDatatate } from '../static-data.selectors';

describe('StaticData Selectors', () => {
  it('should select the feature state', () => {
    const result = selectStaticDatatate({
      [fromStaticData.staticDataFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
