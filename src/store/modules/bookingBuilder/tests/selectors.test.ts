import {
  guestInfoSelector,
  agreeToTermsSelector,
  isPristineSelector,
  guestInfoValidationSelector,
  agreeToTermsValidationSelector,
  travelAgentUserUuidValidationSelector,
  domainValidationSelector
} from '../selectors';

import { initialState } from '../model';

describe('Booking Builder Selectors', () => {

  describe('guestInfoSelector', () => {
    it('selects correctly', () => {
      const payload = {
        guestTitle: 'mr',
        guestFirstName: 'John',
        guestLastName: 'Smith',
        isRepeatGuest: true,
      };
      const inputState = { ...initialState, ...payload };
      expect(guestInfoSelector.resultFunc(inputState)).toEqual(payload);
    });
  });

  describe('agreeToTermsSelector', () => {
    it('selects correctly', () => {
      const payload = {
        agreeToTerms: true
      };
      const inputState = { ...initialState, ...payload };
      expect(agreeToTermsSelector.resultFunc(inputState)).toEqual(true);
    });
  });

  describe('isPristineSelector', () => {
    it('selects correctly', () => {
      const payload = {
        isPristine: false
      };
      const inputState = { ...initialState, ...payload };
      expect(isPristineSelector.resultFunc(inputState)).toEqual(false);
    });
  });

  describe('guestInfoValidationSelector', () => {
    it('selects correctly', () => {
      expect(
        guestInfoValidationSelector.resultFunc(initialState)
      )
      .toMatchObject({
        guestFirstName: ['Required'],
        guestLastName: ['Required']
      });
    });
  });

  describe('agreeToTermsValidationSelector', () => {
    it('selects correctly', () => {
      expect(
        agreeToTermsValidationSelector.resultFunc(false)
      )
      .toMatchObject({
        agreeToTerms: ['Required']
      });
    });
  });

  describe('travelAgentUserUuidValidationSelector', () => {
    it('selects correctly', () => {
      expect(
        travelAgentUserUuidValidationSelector.resultFunc(null, true)
      )
      .toMatchObject({
        travelAgentUserUuid: ['Required']
      });
    });
  });

  describe('domainValidationSelector', () => {
    it('selects correctly', () => {
      const guestValidation = {
        guestFirstName: ['Required'],
        guestLastName: ['Required']
      };

      const termsValidation = {
        agreeToTerms: ['Required']
      };

      const travelAgentUserUuidValidation = {
        travelAgentUserUuid: ['Required']
      };

      expect(
        domainValidationSelector.resultFunc(
          guestValidation,
          termsValidation,
          travelAgentUserUuidValidation
        )
      )
      .toMatchObject({
        ...guestValidation,
        ...termsValidation,
        ...travelAgentUserUuidValidation
      });
    });
  });  

});

