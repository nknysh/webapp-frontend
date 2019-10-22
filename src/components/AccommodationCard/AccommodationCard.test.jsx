import React from 'react';

import AccomodationCard from './AccommodationCard.jsx';

const defaultProps = {
  id: 'Test ID',
  availableToHold: false,
  currencyCode: '£',
  title: 'Test Subject',
  description: 'Some description',
  moreInformation: 'More information',
  amenities: ['Shower', 'Internet', 'Fridge'],
  size: 100,
  brochures: [
    {
      displayName: 'Beach House Brochure',
      url: 'http://www.africau.edu/images/default/sample.pdf?placeholderName=3b4add73-a827-4861-9064-ae3153d881df',
      uuid: '3b4add73-a827-4861-9064-ae3153d881df',
    },
    {
      displayName: 'Beach House Floor Plan',
      url: 'http://www.africau.edu/images/default/sample.pdf?placeholderName=3b4add73-a827-4861-9064-ae3153d881df',
      uuid: '3b4add73-a827-4861-9064-ae3153d881df',
    },
  ],
  totals: {
    oneOrMoreItemsOnRequest: false,
    total: '12345.00',
    totalBeforeDiscount: '23456.00',
    totalBeforeDiscountForPricedItems: '23456.00',
    totalBeforeDiscountForPricedItemsCents: 2345600,
    totalForPricedItems: '12345.00',
    totalForPricedItemsCents: 1234500,
  },
  occupancy: {
    standardOccupancy: 2,
    maximumPeople: 5,
    limits: [
      { maximum: 3, minimum: 1, name: 'default' },
      { maximum: 3, minimum: 1, name: 'Infant' },
      { maximum: 3, minimum: 1, name: 'Young Child' },
    ],
  },
  selectedCount: 99,
  appliedOffers: ['Test Offer 1', 'Test Offer 2'],
  imageUri: 'test-url',
  updateInProgress: false,
  // We should use spies here, but it's nigght on impossible to
  // select the NumberSelect buttons to trigger these actions.
  onRoomAdd: () => {},
  onRoomRemove: () => {},
};

describe('<AccomodationCard />', () => {
  describe('render', () => {
    it('matches snapshots (default props)', () => {
      const subject = shallow(<AccomodationCard {...defaultProps} />);
      expect(subject).toMatchSnapshot();
    });

    it('matches snapshots (Available to hold)', () => {
      const props = { ...defaultProps, availableToHold: true };
      const subject = shallow(<AccomodationCard {...props} />);
      expect(subject).toMatchSnapshot();
    });

    it('matches snapshots (Update in progress)', () => {
      const props = { ...defaultProps, updateInProgress: true };
      const subject = shallow(<AccomodationCard {...props} />);
      expect(subject).toMatchSnapshot();
    });
  });

  describe('More/Less Information', () => {
    // TODO: We can't test anything hook related until we update react to 16.8.5
  });
});
