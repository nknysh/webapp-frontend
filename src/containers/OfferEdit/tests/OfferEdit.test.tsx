import React from 'react';
import { OfferEditContainer } from '../';
import { shallow } from 'enzyme';
import { IOfferEditProps, IRouteParams } from '../index';
import { getMockRouterProps } from 'utils/mockRouter';
import { IOffer } from 'services/BackendApi';

const createProps = (overrides?: Partial<IOfferEditProps>): IOfferEditProps => {
  const defaultProps: IOfferEditProps = {
    getOfferRequestAction: jest.fn(),
    getOfferRequestPending: false,
    offer: {} as IOffer,
    error: null,
    ...getMockRouterProps<IRouteParams>({ offerId: '123' }),
  };

  return {
    ...defaultProps,
    ...overrides,
  };
};

describe('OfferEditContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<OfferEditContainer {...createProps()} />);
  });

  it('displays the correct UI', () => {
    expect(wrapper.exists('.basicInfo')).toBe(true);
    expect(wrapper.exists('.hotelSelect')).toBe(true);
    expect(wrapper.exists('.hotelSelectInput')).toBe(true);
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
