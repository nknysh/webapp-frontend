import { IBootstrapModule } from './model';
import { createSelector } from 'reselect';

export const bootstrapDomainSelector = (state: any) => state.bootstrap as IBootstrapModule;

export const getBootstrapCountriesSelector = createSelector(bootstrapDomainSelector, domain => domain.countries);

export const getBootstrapHotelsSelector = createSelector(bootstrapDomainSelector, domain => domain.hotels);

export const getBootstrapExtraPersonSupplementProductSelector = createSelector(
  bootstrapDomainSelector,
  domain => domain.extraPersonSupplementProduct
);
