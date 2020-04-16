import React from 'react';
import { OfferEditApplicationsContainer } from '..';
import { shallow } from 'enzyme';
import { IOfferProductDiscountInstance } from '../../../services/BackendApi/types/OfferResponse';
import { EGreenTaxApproach, GreenTaxApproachInfo } from '../../../utils/greenTax';
import { createProps, createValidaitonErrors } from './testHelpers';
import { CloseButton } from '../../../pureUi/Buttons';

describe('Offer Edit Applicaions: Accomodation Discount', () => {
  const accomodationDiscount: IOfferProductDiscountInstance = {
    discountPercentage: 1.5,
    products: [],
  };

  const validationErrors = createValidaitonErrors({
    accommodationProductDiscount: [{ field: 'accommodationProductDiscount', message: 'Some error' }],
  });

  let accomDiscountProps;
  let accomDiscountSubject;

  beforeEach(() => {
    accomDiscountProps = createProps({ accomodationDiscount, validationErrors, offerIsPristine: false });
    accomDiscountSubject = shallow(<OfferEditApplicationsContainer {...accomDiscountProps} />).find(
      '.accomodationDiscountFieldset'
    );
  });

  it('Does not render the UI if accomodationDiscount is undefined', () => {
    const props = createProps();
    const subject = shallow(<OfferEditApplicationsContainer {...props} />).find('.accomodationDiscountGrid');
    expect(subject.length).toBe(0);
  });

  it('Adds the discount', () => {
    const bespokeProps = createProps();
    const bespokeSubject = shallow(<OfferEditApplicationsContainer {...bespokeProps} />).find(
      '.accomodationDiscountFieldset'
    );
    bespokeSubject.find('.addDiscount').simulate('click');
    expect(bespokeProps.offerAddAccommodationDiscountAction).toHaveBeenCalledTimes(1);
  });

  it('Removes the discount', () => {
    accomDiscountSubject
      .find('.removeButton')
      .find(CloseButton)
      .simulate('click');
    expect(accomDiscountProps.offerClearAllAccommodationDiscountAction).toHaveBeenCalledTimes(1);
  });

  describe('Discount Percentage', () => {
    it('Renders the correct value', () => {
      const inputValue = accomDiscountSubject.find('.pctInput').props().value;
      expect(inputValue).toBe(accomodationDiscount.discountPercentage);
    });

    it('Handles the change event', () => {
      accomDiscountSubject.find('.pctInput').simulate('change', { currentTarget: { value: '90' } });
      expect(accomDiscountProps.offerSetAccommodationDiscountDiscountPercentageAction).toHaveBeenCalledWith(90);
      expect(accomDiscountProps.offerSetAccommodationDiscountDiscountPercentageAction).toHaveBeenCalledTimes(1);
    });
  });

  describe('Green Tax Approach', () => {
    it('Renders the correct option when undefined', () => {
      const inputValue = accomDiscountSubject.find('.greenTaxSelect').props().value;
      expect(inputValue).toBe('');
    });

    it('Renders the correct option when set', () => {
      const bespokeDiscount: IOfferProductDiscountInstance = {
        discountPercentage: 1.5,
        products: [],
        greenTaxDiscountApproach: EGreenTaxApproach.DISCOUNT_BEFORE_GREEN_TAX,
      };
      const bespokeProps = createProps({ accomodationDiscount: bespokeDiscount });
      const bespokeSubject = shallow(<OfferEditApplicationsContainer {...bespokeProps} />);
      const inputValue = bespokeSubject.find('.greenTaxSelect').props().value;
      expect(inputValue).toBe(bespokeDiscount.greenTaxDiscountApproach);
    });

    it('renders the correct info', () => {
      const bespokeDiscount: IOfferProductDiscountInstance = {
        discountPercentage: 1.5,
        products: [],
        greenTaxDiscountApproach: EGreenTaxApproach.DISCOUNT_BEFORE_GREEN_TAX,
      };
      const bespokeProps = createProps({ accomodationDiscount: bespokeDiscount });
      const bespokeSubject = shallow(<OfferEditApplicationsContainer {...bespokeProps} />);
      const info = bespokeSubject.find('.info');
      expect(info.props().children).toBe(GreenTaxApproachInfo[EGreenTaxApproach.DISCOUNT_BEFORE_GREEN_TAX]);
    });

    it('Handles the change event', () => {
      accomDiscountSubject.find('.pctInput').simulate('change', { currentTarget: { value: '90' } });
      expect(accomDiscountProps.offerSetAccommodationDiscountDiscountPercentageAction).toHaveBeenCalledWith(90);
      expect(accomDiscountProps.offerSetAccommodationDiscountDiscountPercentageAction).toHaveBeenCalledTimes(1);
    });
  });

  describe('Validations', () => {
    it('Does not render any validations if pristine', () => {
      const bespokeProps = createProps({ accomodationDiscount, validationErrors, offerIsPristine: true });
      const bespokeSubject = shallow(<OfferEditApplicationsContainer {...bespokeProps} />)
        .find('.accomodationDiscountFieldset')
        .find('.errorlist')
        .find('li');
      expect(bespokeSubject.length).toBe(0);
    });

    it('renders errors', () => {
      const errors = accomDiscountSubject.find('.errorlist').find('li');
      expect(errors.length).toBe(1);
    });
  });
});
