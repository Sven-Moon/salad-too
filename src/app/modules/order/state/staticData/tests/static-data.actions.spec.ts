import * as fromStaticData from '../static-data.actions';

describe('loadStaticData', () => {
  it('should return an action', () => {
    expect(fromStaticData.loadStaticData().type).toBe('[StaticData] Load StaticData');
  });
});
