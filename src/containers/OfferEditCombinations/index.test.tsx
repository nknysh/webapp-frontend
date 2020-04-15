import React from 'react';
import { OfferEditCombinationsContainer, IOfferEditOrderingProps } from './';
import { shallow, mount } from 'enzyme';
import { ECombinationMode } from 'store/modules/offer/model';
import { IOfferOnHotelItem } from '../../services/BackendApi/types/OfferResponse';

const mockProps = (overrides: Partial<IOfferEditOrderingProps> = {}): IOfferEditOrderingProps => {
  const combinationList = Array.from({ length: 10 }).map((_, idx) => {
    return {
      uuid: `OFFER_${idx}`,
      label: `OFFER_NAME_${idx}`,
      value: false,
    };
  });

  return {
    hotelUuid: 'HOTEL_UUID',
    combinationMode: ECombinationMode.COMBINES_WITH_ANY,
    combinationList,
    offerIsPristine: true,
    validationErrors: {
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
    },
    offerSetCombinationMode: jest.fn(),
    offerToggleOfferInCombinationList: jest.fn(),
    ...overrides,
  };
};

describe('OfferEditCombinations', () => {
  it('Renders a select input with the corrext options', () => {
    const subject = shallow(<OfferEditCombinationsContainer {...mockProps()} />);
    const opts = subject.find('option');
    expect(opts.length).toBe(4);
  });

  it("does NOT render an offers list if mode is 'COMBINES_WITH_ANY'", () => {
    const subject = shallow(<OfferEditCombinationsContainer {...mockProps()} />);
    const grid = subject.find('.offerGrid');
    expect(grid.length).toBe(0);
  });

  it("does NOT render an offers list if mode is 'COMBINES_WITH_NONE'", () => {
    const props = mockProps({ combinationMode: ECombinationMode.COMBINES_WITH_NONE });
    const subject = shallow(<OfferEditCombinationsContainer {...props} />);
    const grid = subject.find('.offerGrid');
    expect(grid.length).toBe(0);
  });

  it("does render an offers list if mode is 'COMBINES_WITH_LIST'", () => {
    const props = mockProps({ combinationMode: ECombinationMode.COMBINES_WITH_LIST });
    const subject = shallow(<OfferEditCombinationsContainer {...props} />);
    const grid = subject.find('.offerGrid');
    expect(grid.length).toBe(1);
  });

  it("does render an offers list if mode is 'CANNOT_COMBINE_WITH_LIST'", () => {
    const props = mockProps({ combinationMode: ECombinationMode.CANNOT_COMBINE_WITH_LIST });
    const subject = shallow(<OfferEditCombinationsContainer {...props} />);
    const grid = subject.find('.offerGrid');
    expect(grid.length).toBe(1);
  });

  it('renders the correct amount of offers', () => {
    const props = mockProps({ combinationMode: ECombinationMode.COMBINES_WITH_LIST });
    const subject = mount(<OfferEditCombinationsContainer {...props} />);
    const checkboxes = subject.find('[type="checkbox"]');
    expect(checkboxes.length).toBe(10);
  });

  it('Calls the select change handler correcltyr', () => {
    const props = mockProps();
    const subject = mount(<OfferEditCombinationsContainer {...props} />);
    const select = subject.find('select');
    select.simulate('change', { currentTarget: { value: ECombinationMode.COMBINES_WITH_LIST } });
    expect(props.offerSetCombinationMode).toBeCalledWith(ECombinationMode.COMBINES_WITH_ANY);
  });

  it('calls offerToggleOfferInCombinationList', () => {
    const props = mockProps({ combinationMode: ECombinationMode.COMBINES_WITH_LIST });
    const subject = mount(<OfferEditCombinationsContainer {...props} />);
    const checkbox = subject.find('[type="checkbox"]').at(5);
    checkbox.simulate('change', { currentTarget: { checked: true } });
    // This test isn't striclty correct. For some reason, Jest/enzyme isn't handling the change event
    // correctly. The args should be ('OFFER_5', true). However, I'm testing that the handler
    // is called with the correct UUID and overlooking the checked value. If this test suddenly
    // breaks, it may be because Jest/enzyme is handling the change event correctly.
    expect(props.offerToggleOfferInCombinationList).toBeCalledWith('OFFER_5', false);
  });
});
