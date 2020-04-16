import React from 'react';
import { OfferEditApplicationsContainer } from '..';
import { shallow } from 'enzyme';
import { createProps } from './testHelpers';

describe('Offer Edit Applicaions: Stepping', () => {
  const stepping = {
    maximumNights: 1,
    applyTo: 5,
    discountCheapest: true,
    everyXNights: 5,
  };

  let steppingProps;
  let steppingSubject;

  beforeEach(() => {
    steppingProps = createProps({ stepping });
    steppingSubject = shallow(<OfferEditApplicationsContainer {...steppingProps} />);
  });

  it('Does not render the UI if stepping is undefined', () => {
    const props = createProps();
    const subject = shallow(<OfferEditApplicationsContainer {...props} />);
    const steppingGrid = subject.find('.steppingGrid');
    expect(steppingGrid.length).toBe(0);
  });

  describe('Every X Nights', () => {
    it('Renders the correct value', () => {
      const inputValue = steppingSubject.find('.everyXNightsInput').props().value;
      expect(inputValue).toBe(stepping.everyXNights);
    });

    it('Handles the change event', () => {
      steppingSubject.find('.everyXNightsInput').simulate('change', { currentTarget: { value: '100' } });
      expect(steppingProps.offerSetSteppingEveryXNightsApplicationAction).toHaveBeenCalledWith('100');
      expect(steppingProps.offerSetSteppingEveryXNightsApplicationAction).toHaveBeenCalledTimes(1);
    });
  });

  describe('Apply To', () => {
    it('Renders the correct value', () => {
      const inputValue = steppingSubject.find('.applyTo').props().value;
      expect(inputValue).toBe(stepping.applyTo);
    });

    it('Handles the change event', () => {
      steppingSubject.find('.applyTo').simulate('change', { currentTarget: { value: '99' } });
      expect(steppingProps.offerSetSteppingApplyToApplicationAction).toHaveBeenCalledWith('99');
      expect(steppingProps.offerSetSteppingApplyToApplicationAction).toHaveBeenCalledTimes(1);
    });
  });

  describe('Max Nights', () => {
    it('Renders the correct value', () => {
      const inputValue = steppingSubject.find('.maxNights').props().value;
      expect(inputValue).toBe(stepping.maximumNights);
    });

    it('Handles the change event', () => {
      steppingSubject.find('.maxNights').simulate('change', { currentTarget: { value: '98' } });
      expect(steppingProps.offerSetSteppingMaximumNightsApplicationAction).toHaveBeenCalledWith('98');
      expect(steppingProps.offerSetSteppingMaximumNightsApplicationAction).toHaveBeenCalledTimes(1);
    });
  });

  describe('Discount Cheapest', () => {
    it('Renders the correct value', () => {
      const inputValue = steppingSubject.find('.discountCheapest').props().checked;
      expect(inputValue).toBe(true);
    });

    it('Handles the change event', () => {
      steppingSubject.find('.discountCheapest').simulate('change', { currentTarget: { checked: false } });
      expect(steppingProps.offerSetSteppingDiscountCheapestApplicationAction).toHaveBeenCalledWith(false);
      expect(steppingProps.offerSetSteppingDiscountCheapestApplicationAction).toHaveBeenCalledTimes(1);
    });
  });
});
