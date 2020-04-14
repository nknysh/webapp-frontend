import { IOfferUI } from 'services/BackendApi';
import { addDiscountHandler } from '../../utils';
import { offerAddProductDiscountAction, offerAddSubProductDiscountAction } from '../../subdomains/offer/actions';
import { Supplement } from '../../../../../services/BackendApi/types/OffersSearchResponse';

const getMockState = (): IOfferUI['productDiscounts'] | IOfferUI['subProductDiscounts'] => {
  return {
    Fine: [],
    Supplement: [],
  };
};

describe('addDiscountHandler', () => {
  it('adds a Product discount', () => {
    const action = offerAddProductDiscountAction('Fine');
    const result = addDiscountHandler(getMockState(), action);
    expect(result.Supplement!.length).toBe(0);
    expect(result.Fine!.length).toBe(1);
    expect(typeof result.Fine![0].uuid).toBe('string');
  });

  it('adds a SubProduct discount with a default product UUID', () => {
    const testUuid = 'TEST_UUID';
    const action = offerAddSubProductDiscountAction('Supplement', testUuid);
    const result = addDiscountHandler(getMockState(), action);
    expect(result.Supplement!.length).toBe(1);
    expect(result.Supplement![0].uuid).not.toBe(testUuid);
    expect(result.Supplement![0].products!.length).toBe(1);
    expect(result.Supplement![0].products![0].uuid).toBe(testUuid);
  });
});
