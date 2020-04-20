import React from 'react';
import { IOfferEditApplicationsProps, OfferEditApplicationsContainer } from '..';
import { getMockRouterProps } from 'utils/mockRouter';
import { ShallowWrapper, shallow } from 'enzyme';
import { OfferValidatorResultSet } from 'store/modules/offer/validation';
import { EProductCategory, IAgeName, IProduct } from 'services/BackendApi';

export const createProps = (
  overrides?: Partial<IOfferEditApplicationsProps>,
  path?: string
): IOfferEditApplicationsProps => {
  const defaultProps: IOfferEditApplicationsProps = {
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
      applications: [],
      combinations: [],
      stayLengthPrerequisite: [],
    },
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
    ageNameAccordianKeys: [],

    hasApplicationsErrors: false,
    hasValidationErrors: false,
    offerIsPristine: true,
    stepping: undefined,
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
    toggleAgeNameAccordianKey: jest.fn(),
    offerToggleAgeNameOnProductAction: jest.fn(),
    offerToggleAgeNameOnSubProductAction: jest.fn(),
    offerSetSteppingEveryXNightsApplicationAction: jest.fn(),
    offerSetSteppingApplyToApplicationAction: jest.fn(),
    offerSetSteppingMaximumNightsApplicationAction: jest.fn(),
    offerSetSteppingDiscountCheapestApplicationAction: jest.fn(),
    offerClearAllSteppingApplicationAction: jest.fn(),
    offerAddSteppingApplicationAction: jest.fn(),
    offerAddAccommodationDiscountAction: jest.fn(),
    offerClearAllAccommodationDiscountAction: jest.fn(),
    ...getMockRouterProps<{}>({}, path || 'offer/edit/applications'),
  };

  return {
    ...defaultProps,
    ...overrides,
  };
};

export const setupTest = (
  rootSubject: string,
  overrides: Partial<IOfferEditApplicationsProps>
): {
  props: IOfferEditApplicationsProps;
  subject: ShallowWrapper<{}, {}, any>;
} => {
  const props = createProps(overrides);
  const subject = shallow(<OfferEditApplicationsContainer {...props} />).find(rootSubject);
  return { props, subject };
};

export const createValidaitonErrors = (overrides: Partial<OfferValidatorResultSet>): OfferValidatorResultSet => {
  return {
    hotelUuid: [],
    name: [],
    termsAndConditions: [],
    furtherInformation: [],
    accommodationProductsPrerequisite: [],
    // prerequisites
    stayBetweenPrerequisite: [],
    stayLengthPrerequisite: [],
    stepping: [],

    //single one
    accommodationProductDiscount: [],

    // product discounts, broken up
    fineDiscounts: [],
    groundServiceDiscounts: [],
    transferDiscounts: [],
    supplementDiscounts: [],
    combinations: [],
    applications: [],

    // sub product discounts, broken up
    mealPlanDiscounts: [],
    extraPersonSupplementDiscounts: [],
    ...overrides,
  };
};

export const makeAvailableProducts = (
  type: string,
  categories: EProductCategory[],
  ageNames?: IAgeName[]
): IProduct<any>[] => {
  return categories.map((cat, idx) => ({
    uuid: `${type.toUpperCase()}_PRODUCT_${idx}`,
    type: type,
    name: `Test product ${idx}`,
    category: cat,
    ownerType: 'hotel',
    ownerUuid: 'OWNER_UUID_1',
    createdAt: '2020-01-01',
    updatedAt: '2020-01-01',
    meta: {},
    options: {
      ages: ageNames,
    },
  }));
};
