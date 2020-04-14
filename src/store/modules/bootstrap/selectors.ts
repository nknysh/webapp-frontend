import { IBootstrapModule, IBootstrapCountry } from './model';
import { createSelector } from 'reselect';
import { groupBy } from 'ramda';
import { IValueLabelPair } from 'interfaces';

export const bootstrapDomainSelector = (state: any) => state.bootstrap as IBootstrapModule;

export const getBootstrapCountriesSelector = createSelector(bootstrapDomainSelector, domain => domain.countries);

export const bootstrapCountriesByRegionSelector = createSelector(getBootstrapCountriesSelector, countries =>
  groupBy(country => country.region, countries || [])
);

export const getBootstrapHotelsSelector = createSelector(bootstrapDomainSelector, domain => domain.hotels);

export const getBootstrapExtraPersonSupplementProductSelector = createSelector(
  bootstrapDomainSelector,
  domain => domain.extraPersonSupplementProduct
);
