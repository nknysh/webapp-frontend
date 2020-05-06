import {
  pendingProposalsSubdomainSelector,
  pendingProposalsRequestIsPendingSelector,
  pendingProposalsErrorSelector,
  pendingProposalsCountSelector,
  pendingProposalsLatestSelector
} from './selectors';

import { initialState } from '../../model';

describe('Pending Proposals Selectors', () => {

  describe('pendingProposalsSubdomainSelector', () => {
    it('selects correctly', () => {
      expect(pendingProposalsSubdomainSelector.resultFunc(initialState)).toEqual(initialState.pendingProposals);
    });
  });

  describe('pendingProposalsRequestIsPendingSelector', () => {
    it('selects correctly', () => {
      expect(pendingProposalsRequestIsPendingSelector.resultFunc(initialState.pendingProposals)).toEqual(false);
    });
  });

  describe('pendingProposalsErrorSelector', () => {
    it('validates correctly', () => {
      expect(pendingProposalsErrorSelector.resultFunc(initialState.pendingProposals)).toEqual(null);
    });
  });

  describe('pendingProposalsCountSelector', () => {
    it('validates correctly', () => {
      expect(pendingProposalsCountSelector.resultFunc(initialState.pendingProposals)).toEqual(0);
    });
  });

  describe('pendingProposalsLatestSelector', () => {
    it('validates correctly', () => {
      expect(pendingProposalsLatestSelector.resultFunc(initialState.pendingProposals)).toEqual(null);
    });
  });

});