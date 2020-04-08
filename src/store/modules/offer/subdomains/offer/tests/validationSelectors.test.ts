import {
  offerNameValidationSelector,
  offerTsAndCsValidationSelector,
  offerAccommodationProductsPrerequisitesValidationSelector,
  offerStayBetweenPrerequisiteValidationSelector,
  offerSteppingValidationSelector,
  offerProductDiscountsValidationSelector,
  offerSubProductDiscountsValidationSelector,
} from '../selectors';
import { initialState } from '../../../model';
import { IOfferUI, IOfferStepping } from 'services/BackendApi';

describe('offer validation selectors', () => {
  describe('name validation selector', () => {
    it('name is required (passing)', () => {
      const fixture = {
        ...initialState.offer,
        name: 'a',
      };

      const results = offerNameValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(0);
    });
  });

  describe('terms and conditions validation selector', () => {
    it('termsAndConditions is required (passing)', () => {
      const fixture = {
        ...initialState.offer,
        termsAndConditions: 'a',
      };

      const results = offerTsAndCsValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(0);
    });
  });

  describe.skip('accommodation products', () => {
    it('if no hotel uuid set, dont fail', () => {
      const fixture: string[] = [];

      const offerFixture = {
        hotelUuid: '',
      } as IOfferUI;

      const results = offerAccommodationProductsPrerequisitesValidationSelector.resultFunc(fixture, offerFixture);
      expect(results.errors.length).toEqual(0);
    });

    it('if set, it needs to have at least 1 (passing)', () => {
      const fixture: string[] = ['a'];

      const offerFixture = {
        hotelUuid: 'a',
      } as IOfferUI;

      const results = offerAccommodationProductsPrerequisitesValidationSelector.resultFunc(fixture, offerFixture);
      expect(results.errors.length).toEqual(0);
    });

    it('if set, it needs to have at least 1 (failing)', () => {
      const fixture: string[] = [];

      const offerFixture = {
        hotelUuid: 'a',
      } as IOfferUI;

      const results = offerAccommodationProductsPrerequisitesValidationSelector.resultFunc(fixture, offerFixture);
      expect(results.errors.length).toEqual(1);
    });
  });

  describe('stay between', () => {
    it('we need at least 1', () => {
      const fixture = [];

      const results = offerStayBetweenPrerequisiteValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(1);
    });

    it('for each, start date must be before end date (passing)', () => {
      const fixture = [
        {
          startDate: '2019-01-01',
          endDate: '2020-01-01',
        },
      ];

      const results = offerStayBetweenPrerequisiteValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(0);
    });

    it('for each, start date must be before end date (failing)', () => {
      const fixture = [
        {
          startDate: '2020-01-01',
          endDate: '2019-01-01',
        },
      ];

      const results = offerStayBetweenPrerequisiteValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(1);
    });

    it('for each, start date must be before end date (failing, multiple)', () => {
      const fixture = [
        {
          startDate: '2020-01-01',
          endDate: '2019-01-01',
        },
        {
          startDate: '2020-01-01',
          endDate: '2019-01-01',
        },
      ];

      const results = offerStayBetweenPrerequisiteValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(2);
    });
  });

  describe('stepping', () => {
    it('stepping is not required', () => {
      const fixture = undefined;

      const results = offerSteppingValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(0);
    });

    it('if stepping is defined, every X nights is required', () => {
      const fixture = {
        everyXNights: undefined,
        applyTo: 5,
        discountCheapest: true,
        maximumNights: 6,
      } as IOfferStepping;

      const results = offerSteppingValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(1);
    });

    it('if stepping is defined, apply to is required', () => {
      const fixture = {
        everyXNights: 4,
        applyTo: undefined,
        discountCheapest: true,
        maximumNights: 6,
      } as IOfferStepping;

      const results = offerSteppingValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(1);
    });
  });

  describe('product discounts', () => {
    it('product discounts are not required', () => {
      const fixture = undefined;

      const results = offerProductDiscountsValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(0);
    });

    it('if a Fine discount is present, discount percentage is required', () => {
      const fixture = {
        Fine: [
          {
            uuid: '1',
            discountPercentage: undefined,
            products: [],
          },
        ],
      };

      const results = offerProductDiscountsValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(1);
    });

    it('if a Fine discount is present, discount percentage is required (passing)', () => {
      const fixture = {
        Fine: [
          {
            uuid: '1',
            discountPercentage: 10,
            products: [],
          },
        ],
      };

      const results = offerProductDiscountsValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(0);
    });

    it('if a Transfer discount is present, discount percentage is required', () => {
      const fixture = {
        Transfer: [
          {
            uuid: '1',
            discountPercentage: undefined,
            products: [],
          },
        ],
      };

      const results = offerProductDiscountsValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(1);
    });

    it('if a Transfer discount is present, discount percentage is required (passing)', () => {
      const fixture = {
        Transfer: [
          {
            uuid: '1',
            discountPercentage: 10,
            products: [],
          },
        ],
      };

      const results = offerProductDiscountsValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(0);
    });

    it('if a Supplement discount is present, discount percentage is required', () => {
      const fixture = {
        Supplement: [
          {
            uuid: '1',
            discountPercentage: undefined,
            products: [],
          },
        ],
      };

      const results = offerProductDiscountsValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(1);
    });

    it('if a Supplement discount is present, discount percentage is required (passing)', () => {
      const fixture = {
        Supplement: [
          {
            uuid: '1',
            discountPercentage: 10,
            products: [],
          },
        ],
      };

      const results = offerProductDiscountsValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(0);
    });

    it('if a Ground Service discount is present, discount percentage is required', () => {
      const fixture = {
        'Ground Service': [
          {
            uuid: '1',
            discountPercentage: undefined,
            products: [],
          },
        ],
      };

      const results = offerProductDiscountsValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(1);
    });

    it('if a Ground Service discount is present, discount percentage is required (passing)', () => {
      const fixture = {
        'Ground Service': [
          {
            uuid: '1',
            discountPercentage: 10,
            products: [],
          },
        ],
      };

      const results = offerProductDiscountsValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(0);
    });
  });

  describe('sub product discounts', () => {
    it('sub product discounts are not required', () => {
      const fixture = undefined;

      const results = offerSubProductDiscountsValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(0);
    });

    it('if a Supplement discount is present, discount percentage is required', () => {
      const fixture = {
        Supplement: [
          {
            uuid: '1',
            discountPercentage: undefined,
            products: [],
          },
        ],
      };

      const results = offerSubProductDiscountsValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(1);
    });

    it('if a Supplement discount is present, discount percentage is required (passing)', () => {
      const fixture = {
        Supplement: [
          {
            uuid: '1',
            discountPercentage: 10,
            products: [],
          },
        ],
      };

      const results = offerSubProductDiscountsValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(0);
    });

    it('if a Meal Plan discount is present, discount percentage is required', () => {
      const fixture = {
        'Meal Plan': [
          {
            uuid: '1',
            discountPercentage: undefined,
            products: [],
          },
        ],
      };

      const results = offerSubProductDiscountsValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(1);
    });

    it('if a Meal Plan discount is present, discount percentage is required (passing)', () => {
      const fixture = {
        'Meal Plan': [
          {
            uuid: '1',
            discountPercentage: 10,
            products: [],
          },
        ],
      };

      const results = offerSubProductDiscountsValidationSelector.resultFunc(fixture);
      expect(results.errors.length).toEqual(0);
    });
  });
});
