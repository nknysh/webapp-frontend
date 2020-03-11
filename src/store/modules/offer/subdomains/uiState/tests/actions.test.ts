import { setOfferIsTextOnly } from '../actions';

describe('uiState acitons', () => {
  it('Returns the correct object literals', () => {
    expect(setOfferIsTextOnly(true)).toMatchSnapshot();
  });
});
