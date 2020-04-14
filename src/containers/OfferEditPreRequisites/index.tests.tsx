import React from 'react';
import { OfferEditPreRequisitesContainer, IOfferEditPreRequisitesProps, IRouteParams } from './';
import { shallow } from 'enzyme';
import { getMockRouterProps } from 'utils/mockRouter';

const createProps = (
  overrides?: Partial<IOfferEditPreRequisitesProps>,
  path?: string
): IOfferEditPreRequisitesProps => {
  const defaultProps: IOfferEditPreRequisitesProps = {
    validationErrors: {
      accommodationProductsPrerequisite: [],
      hotelUuid: [],
      name: [],
      stayBetweenPrerequisite: [],
      stepping: [],
      termsAndConditions: [],
      furtherInformation: [],
      extraPersonSupplementDiscounts: [],
      fineDiscounts: [],
      groundServiceDiscounts: [],
      mealPlanDiscounts: [],
      supplementDiscounts: [],
      transferDiscounts: [],
      accommodationProductDiscount: [],
    },
    stayBetweenDates: [['2020-01-01', '2020-02-01']],
    offerHotelUuid: '123',
    taCountries: {},
    taCountriesLabel: 'All Countries',
    taCountryAccordianKeys: [],
    accommodationPreReqsLabel: 'All Countries',
    accommodationPreReqs: [],
    nullableBooleans: {
      honeymoon: true,
      wedding: false,
      repeatCustomer: null,
    },
    maxLodgings: 10,
    stayLength: {
      minimum: 0,
      maximum: 10,
      strictMinMaxStay: false,
    },
    offerIsPristine: true,
    advance: {},
    // WithBootstrapData props
    bootstrapCountries: [],
    bootstrapCountriesByRegion: {},
    bootstrapHotels: Array.from({ length: 10 }).map((_, idx) => ({
      name: `Test Hotel ${idx}`,
      uuid: `hotel_${idx}`,
      countryCode: 'MV',
    })),
    bootsrapExtraPersonSupplementId: {
      uuid: 'EPS_123',
      name: 'Extra Person Supplement',
    },
    // Actions
    offerAddStayBetweenPrerequisiteAction: jest.fn(),
    offerChangeStayBetweenPrerequisiteAction: jest.fn(),
    offerRemoveStayBetweenPrerequisiteAction: jest.fn(),
    offerSetBooleanPrerequisiteAction: jest.fn(),
    offerSetCountryCodePrerequisiteAction: jest.fn(),
    offerClearAllCountryCodePrerequisiteAction: jest.fn(),
    offerToggleTaCountryAccodian: jest.fn(),
    offerClearAllAccommodationProductPrerequisiteAction: jest.fn(),
    offerSetAccommodationProductPrerequisiteAction: jest.fn(),
    offerSetMaxLodgingsPrerequisiteAction: jest.fn(),
    offerSetStayLengthMaximumPrerequisiteAction: jest.fn(),
    offerSetStayLengthMinimumPrerequisiteAction: jest.fn(),
    offerSetStayLengthStrictPrerequisiteAction: jest.fn(),
    offerSetAdvanceBookByPrerequisiteAction: jest.fn(),
    offerSetAdvanceMaximumPrerequisiteAction: jest.fn(),
    offerSetAdvanceMinimumPrerequisiteAction: jest.fn(),
    offerClearAllAdvancePrerequisiteAction: jest.fn(),

    ...getMockRouterProps<IRouteParams>({ offerId: '123' }, path || 'offer/edit'),
  };

  return {
    ...defaultProps,
    ...overrides,
  };
};

describe('OfferEditContainer Edit Mode', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<OfferEditPreRequisitesContainer {...createProps()} />);
  });

  it('displays the correct Edit UI', () => {
    expect(wrapper.exists('.stayBetweenInputs')).toBe(true);
  });
});
