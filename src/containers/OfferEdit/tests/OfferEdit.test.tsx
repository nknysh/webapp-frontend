import React from 'react';
import { OfferEditContainer } from '../';
import { shallow } from 'enzyme';
import { IOfferEditProps, IOfferRouteMatch } from '../index';

const createProps = (overrides?: Partial<IOfferEditProps>): IOfferEditProps => {
  const defaultProps: IOfferEditProps = {
    getOfferRequestAction: jest.fn(),

    getOfferRequestPending: false,
    offer: null,
    error: null,
    match: {
      params: {
        offerId: '123',
      },
    } as IOfferRouteMatch,
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
