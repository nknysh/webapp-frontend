import React from 'react';
import { OfferEditApplicationsContainer, IOfferEditPreRequisitesProps } from '.';
import { shallow } from 'enzyme';
import { getMockRouterProps } from 'utils/mockRouter';

const createProps = (
  overrides?: Partial<IOfferEditPreRequisitesProps>,
  path?: string
): IOfferEditPreRequisitesProps => {
  const defaultProps: IOfferEditPreRequisitesProps = {
    accomodationDiscount: undefined,
    requiresGreenTax: true,
    isTextOnly: false,
    accomodationAgeNames: [{ name: 'Adult', ageFrom: 0, ageTo: undefined }],
    hotelUuid: 'HOTEL_123',
    availableAccommodationProducts: [],
    availableFineProducts: [],
    availableTransferProducts: [],
    availableGroundServiceProducts: [],
    availableMealPlanProducts: [],
    availableSupplementProducts: [],

    fineDiscounts: [],
    groundServiceDiscounts: [],
    transferDiscounts: [],
    extraPersonSupplementDiscounts: [],
    mealPlanDiscounts: [],
    supplementDiscounts: [],
    // WithBootstrapData props
    bootstrapCountries: [],
    bootstrapCountriesByRegion: {},
    bootstrapHotels: Array.from({ length: 10 }).map((_, idx) => ({
      name: `Test Hotel ${idx}`,
      uuid: `hotel_${idx}`,
    })),
    bootsrapExtraPersonSupplementId: {
      uuid: 'EPS_123',
      name: 'Extra Person Supplement',
    },
    // Actions
    offerSetAccommodationDiscountDiscountPercentageAction: jest.fn(),
    offerSetAccommodationDiscountGreenTaxApproachAction: jest.fn(),
    offerAddProductDiscountAction: jest.fn(),
    offerAddSubProductDiscountAction: jest.fn(),
    offerRemoveProductDiscountAction: jest.fn(),
    offerRemoveSubProductDiscountAction: jest.fn(),
    offerUpdateProductDiscountAction: jest.fn(),
    offerUpdateSubProductDiscountAction: jest.fn(),
    offerAddProductToProductDiscountAction: jest.fn(),
    offerAddProductToSubProductDiscountAction: jest.fn(),
    offerToggleProductDiscountAgeNameAction: jest.fn(),
    offerToggleSubProductDiscountAgeNameAction: jest.fn(),
    offerToggleProductOnProductDiscountAction: jest.fn(),
    offerToggleProductOnSubProductDiscountAction: jest.fn(),
    ...getMockRouterProps<{}>({}, path || 'offer/edit/applications'),
  };

  return {
    ...defaultProps,
    ...overrides,
  };
};

describe('OfferEditContainer Edit Mode', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<OfferEditApplicationsContainer {...createProps()} />);
  });

  it('displays the correct Edit UI', () => {
    expect(wrapper.exists('.basicInfo')).toBe(true);
  });
});
