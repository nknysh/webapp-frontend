import React from 'react';
import { OfferEditContainer } from '../';
import { shallow } from 'enzyme';
import { IOfferEditProps, IRouteParams } from '../index';
import { getMockRouterProps } from 'utils/mockRouter';

const createProps = (overrides?: Partial<IOfferEditProps>): IOfferEditProps => {
  const defaultProps: IOfferEditProps = {
    getOfferRequestAction: jest.fn(),
    getOfferRequestPending: false,
    offer: null,
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

  it('Should call getOfferRequestAction correctly', () => {
    const props = createProps();
    shallow(<OfferEditContainer {...props} />);
    expect(props.getOfferRequestAction).toHaveBeenCalledWith('123');
  });

  it('Should show a heading', () => {
    expect(wrapper.exists('[data-role="heading"]')).toBe(true);
  });

  it('Should show a loading message', () => {
    const customWrapper = shallow(<OfferEditContainer {...createProps({ getOfferRequestPending: true })} />);
    expect(customWrapper.exists('[data-role="loadingMessage"]')).toBe(true);
  });

  it('Should NOT show a loading message', () => {
    expect(wrapper.exists('[data-role="loadingMessage"]')).toBe(false);
  });
});
