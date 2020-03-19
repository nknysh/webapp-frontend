import React from 'react';
import { OfferEditContainer } from '../';
import { shallow } from 'enzyme';
import { IOfferEditProps, IRouteParams } from '../index';
import { getMockRouterProps } from 'utils/mockRouter';
import { IOfferUI } from 'services/BackendApi';
import { postOfferRequestAction } from '../../../store/modules/offer/actions';
import { offerSetBooleanPrerequisiteAction } from '../../../store/modules/offer/subdomains/offer/actions';

const createProps = (overrides?: Partial<IOfferEditProps>, path?: string): IOfferEditProps => {
  const defaultProps: IOfferEditProps = {
    getOfferRequestPending: false,
    offer: {} as IOfferUI,
    stayBetweenDates: [['2020-01-01', '2020-02-01']],
    offerHotelUuid: '123',
    offerTerms: 'Terms',
    offerName: 'Offer name',
    offerFurtherInformation: 'Further info',
    hotelName: 'Test Hotel name',
    isTextOnly: false,
    isPreDiscount: false,
    getError: null,
    putError: null,
    postError: null,
    taCountries: [],
    bootstrapCountriesByRegion: [],
    bootstrapHotels: Array.from({ length: 10 }).map((_, idx) => ({
      name: `Test Hotel ${idx}`,
      uuid: `hotel_${idx}`,
    })),
    nullableBooleans: {
      honeymoon: true,
      wedding: false,
      repeatCustomer: null,
    },
    // Actions
    getOfferRequestAction: jest.fn(),
    offerAddStayBetweenPrerequisiteAction: jest.fn(),
    offerChangeStayBetweenPrerequisiteAction: jest.fn(),
    offerRemoveStayBetweenPrerequisiteAction: jest.fn(),
    offerNameChangeAction: jest.fn(),
    offerTermsChangeAction: jest.fn(),
    offerFurtherInformationChangeAction: jest.fn(),
    setOfferIsTextOnly: jest.fn(),
    offerSetPreDiscountAction: jest.fn(),
    offerHotelUuidChangeAction: jest.fn(),
    putOfferRequestAction: jest.fn(),
    postOfferRequestAction: jest.fn(),
    resetOfferModuleAction: jest.fn(),
    offerSetBooleanPrerequisiteAction: jest.fn(),
    offerSetCountryCodePrerequisiteAction: jest.fn(),
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
    wrapper = shallow(<OfferEditContainer {...createProps()} />);
  });

  it('displays the correct Edit UI', () => {
    expect(wrapper.exists('.basicInfo')).toBe(true);
    expect(wrapper.exists('.hotelSelectInput')).toBe(false);
    expect(wrapper.exists('.hotelName')).toBe(true);
    expect(wrapper.exists('.offerNameInput')).toBe(true);
    expect(wrapper.exists('.offerNameInput')).toBe(true);
    expect(wrapper.exists('.termsAndConditions')).toBe(true);
    expect(wrapper.exists('.termsInput')).toBe(true);
    expect(wrapper.exists('.furtherInformation')).toBe(true);
    expect(wrapper.exists('.furtherInformationInput')).toBe(true);
    expect(wrapper.exists('.textOnly')).toBe(true);
    expect(wrapper.exists('.textOnlyInfo')).toBe(true);
    expect(wrapper.exists('.preDiscount')).toBe(true);
    expect(wrapper.exists('.preDiscountInfo')).toBe(true);
    expect(wrapper.exists('.preRequisites')).toBe(true);
    expect(wrapper.exists('.stayBetweenInputs')).toBe(true);
  });

  it('Should call getOfferRequestAction correctly', () => {
    const props = createProps();
    shallow(<OfferEditContainer {...props} />);
    expect(props.getOfferRequestAction).toHaveBeenCalledWith('123', true);
  });

  it('Should show a loading message', () => {
    const customWrapper = shallow(<OfferEditContainer {...createProps({ getOfferRequestPending: true })} />);
    expect(customWrapper.exists('[data-role="loadingMessage"]')).toBe(true);
  });

  it('Should NOT show a loading message', () => {
    expect(wrapper.exists('[data-role="loadingMessage"]')).toBe(false);
  });
});

describe('OfferEditContainer Create Mode', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<OfferEditContainer {...createProps({}, 'path/create')} />);
  });

  it('displays a hotel select input', () => {
    expect(wrapper.exists('.hotelSelectInput')).toBe(true);
  });
});

describe('Offer Edit/Create Actions', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = createProps();
    wrapper = shallow(<OfferEditContainer {...props} />);
  });

  it('dispacthes a getOfferRequestAction action on mount', () => {
    expect(props.getOfferRequestAction).toHaveBeenCalledTimes(1);
  });

  it('dispacthes a resetOfferModuleAction action on unmount', () => {
    wrapper.unmount();
    expect(props.resetOfferModuleAction).toHaveBeenCalledTimes(1);
  });

  it('dispacthes a offerNameChangeAction action', () => {
    let eventEmitter = wrapper.find('.offerNameInput');
    eventEmitter.simulate('change', { currentTarget: { value: 'NEW VALUE' } });
    expect(props.offerNameChangeAction).toHaveBeenCalledWith('NEW VALUE');
  });

  it('dispacthes a offerTermsChangeAction action', () => {
    let eventEmitter = wrapper.find('.termsInput');
    eventEmitter.simulate('change', { currentTarget: { value: 'NEW VALUE' } });
    expect(props.offerTermsChangeAction).toHaveBeenCalledWith('NEW VALUE');
  });

  it('dispacthes a offerFurtherInformationChangeAction action', () => {
    let eventEmitter = wrapper.find('.furtherInformationInput');
    eventEmitter.simulate('change', { currentTarget: { value: 'NEW VALUE' } });
    expect(props.offerFurtherInformationChangeAction).toHaveBeenCalledWith('NEW VALUE');
  });

  // Disabled test until we enable this checkbox
  // it('dispacthes a setOfferIsTextOnly action', () => {
  //   let eventEmitter = wrapper.find('.textOnlyCheckbox');
  //   eventEmitter.simulate('change', { currentTarget: { checked: true } });
  //   expect(props.setOfferIsTextOnly).toHaveBeenCalledTimes(1);
  // });

  it('dispacthes a offerSetPreDiscountAction action', () => {
    let eventEmitter = wrapper.find('.preDiscountCheckbox');
    eventEmitter.simulate('change', { currentTarget: { checked: true } });
    expect(props.offerSetPreDiscountAction).toHaveBeenCalledTimes(1);
  });

  it('dispacthes a offerHotelUuidChangeAction action', () => {
    const createModeProps = createProps({}, '/create');
    const createWrapper = shallow(<OfferEditContainer {...createModeProps} />);
    let eventEmitter = createWrapper.find('.hotelSelectInput');
    eventEmitter.simulate('change', { currentTarget: { value: 'UUID123' } });
    expect(createModeProps.offerHotelUuidChangeAction).toHaveBeenCalledWith('UUID123');
  });

  it('dispacthes a putOfferRequestAction action', () => {
    let eventEmitter = wrapper.find('.saveButton');
    eventEmitter.simulate('click');
    expect(props.putOfferRequestAction).toHaveBeenCalledTimes(1);
  });

  it('dispatches a postOfferRequestAction action', () => {
    const createModeProps = createProps({}, '/create');
    const createWrapper = shallow(<OfferEditContainer {...createModeProps} />);
    let eventEmitter = createWrapper.find('.saveButton');
    console.log(eventEmitter);
    eventEmitter.simulate('click');
    expect(createModeProps.postOfferRequestAction).toHaveBeenCalledWith(createModeProps.history);
  });
});
