import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose, propOr, prop } from 'ramda';
import { useTranslation } from 'react-i18next';

import { Search, SearchFilters, OccasionsSelect } from 'components';
import { useEffectBoundary, useFetchData } from 'effects';
import { buildQueryString } from 'utils';
import { isActive } from 'store/common';

import connect from './SearchSidebar.state';
import { propTypes, defaultProps } from './SearchSidebar.props';
import { Section, Title, SideBarButton } from './SearchSidebar.styles';

export const SearchSidebar = ({
  features,
  history,
  occasions,
  prices,
  regions,
  searchByName,
  searchFiltersReset,
  searchQuery,
  nameSearchStatus,
  querySearchStatus,
  searchByQuery,
  setSearchQuery,
  starRatings,
  canSearch,
  currentCountry,
  loadSearchOptions,
  isSearchOptionsPending,
  hasSearchOptionsError,
  ...props
}) => {
  const { t } = useTranslation();
  const disableSearchButton = !canSearch || isActive(querySearchStatus);

  const [version, setVersion] = useState(0);
  useFetchData(nameSearchStatus, searchByName, [prop('destination', searchQuery) || { value: '' }]);

  // Push to history stack so the url is updated with the new query but a location change isn't triggered (which
  // would cause a full re-render of the search results)
  useEffectBoundary(() => history.push(`/search?${buildQueryString(searchQuery)}`), [searchQuery]);

  useEffectBoundary(() => {
    searchByQuery(searchQuery);
  }, [version, currentCountry]);

  useEffect(() => {
    loadSearchOptions();
  }, [loadSearchOptions]);

  return (
    <Fragment>
      <Section>
        <Search
          onChange={setSearchQuery}
          onSubmit={() => {
            setVersion(version + 1);
          }}
          onSearch={searchByName}
          searchStatus={nameSearchStatus}
          searchQuery={searchQuery}
          vertical={true}
          canSearch={!disableSearchButton}
          {...props}
        />
      </Section>
      <Section>
        <Title>{t('occasion_plural')}</Title>
        <OccasionsSelect
          occasions={occasions}
          selected={propOr([], 'occasions', searchQuery)}
          onChange={setSearchQuery}
        />
      </Section>
      <Section>
        {!isSearchOptionsPending && !hasSearchOptionsError ? (
          <SearchFilters
            onReset={searchFiltersReset}
            onChange={setSearchQuery}
            regions={regions}
            starRatings={starRatings}
            features={features}
            prices={prices}
            searchQuery={searchQuery}
          />
        ) : (
          <p>Loading filters...</p>
        )}
      </Section>
      <Section>
        <SideBarButton onClick={() => setVersion(version + 1)} disabled={disableSearchButton}>
          {t('buttons.search')}
        </SideBarButton>
      </Section>
    </Fragment>
  );
};

SearchSidebar.propTypes = propTypes;
SearchSidebar.defaultProps = defaultProps;

export default compose(
  withRouter,
  connect
)(SearchSidebar);
