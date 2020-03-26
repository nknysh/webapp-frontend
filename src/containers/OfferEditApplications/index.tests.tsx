import React from 'react';
import { OfferEditApplicationsContainer, IOfferEditPreRequisitesProps } from '.';
import { shallow } from 'enzyme';
import { getMockRouterProps } from 'utils/mockRouter';

const createProps = (
  overrides?: Partial<IOfferEditPreRequisitesProps>,
  path?: string
): IOfferEditPreRequisitesProps => {
  const defaultProps: IOfferEditPreRequisitesProps = {
    // WithBootstrapData props
    bootstrapCountries: [],
    bootstrapCountriesByRegion: {},
    bootstrapHotels: Array.from({ length: 10 }).map((_, idx) => ({
      name: `Test Hotel ${idx}`,
      uuid: `hotel_${idx}`,
    })),
    // Actions
    ...getMockRouterProps<{}>({}, path || 'offer/edit/applications'),
  };

  return {
    ...defaultProps,
    ...overrides,
  };
};

describe('OfferEditContainer Edit Mode', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<OfferEditApplicationsContainer {...createProps()} />);
  });

  it('displays the correct Edit UI', () => {
    expect(wrapper.exists('.basicInfo')).toBe(true);
  });
});
