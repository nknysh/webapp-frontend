import { IOfferUI } from 'services/BackendApi';
import { mergedOrderedOffersListSelector } from '../crossdomainSelectors';

import { mockOffersOrderingData } from './mock';

describe('Cross Domain Selectors', () => {
  describe('mergedOrderedOffersListSelector', () => {
    
    it('Selects correctly', () => {
      const { basic } = mockOffersOrderingData;
      const offer = { uuid: 'b-b', name: 'sample name' } as IOfferUI;

      expect(
        mergedOrderedOffersListSelector.resultFunc(basic.orderedOffers, offer)
      ).toMatchObject([
        { uuid: 'a-a', name: 'a' },
        { uuid: 'b-b', name: 'sample name', selected: true },
        { uuid: 'c-c', name: 'c' }
      ])
    });

  });

});
