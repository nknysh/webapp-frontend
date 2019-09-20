import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { compose, propOr, prop } from 'ramda';
import { useTranslation } from 'react-i18next';

import { Search, SearchFilters, OccasionsSelect } from 'components';
import { useEffectBoundary, useFetchData } from 'effects';
import { buildQueryString } from 'utils';

import connect from './SearchSidebar.state';
import { propTypes, defaultProps } from './SearchSidebar.props';
import { Section, Title } from './SearchSidebar.styles';

export const SearchSidebar = ({
  features,
  history,
  occasions,
  prices,
  regions,
  searchByName,
  searchFiltersReset,
  searchQuery,
  searchStatus,
  setSearchQuery,
  starRatings,
  ...props
}) => {
  const { t } = useTranslation();

  useFetchData(searchStatus, searchByName, [prop('destination', searchQuery) || { value: '' }]);

  // Push to history stack so the url is updated with the new query but a location change isn't triggered (which
  // would cause a full re-render of the search results)
  useEffectBoundary(() => history.push(`/search?${buildQueryString(searchQuery)}`), [searchQuery]);

  return (
    <Fragment>
      <Section>
        <Title>{t('labels.searching')}</Title>
        <Search
          onChange={setSearchQuery}
          onSearch={searchByName}
          showSubmit={false}
          searchStatus={searchStatus}
          searchQuery={searchQuery}
          vertical={true}
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
        <SearchFilters
          onReset={searchFiltersReset}
          onChange={setSearchQuery}
          regions={regions}
          starRatings={starRatings}
          features={features}
          prices={prices}
          searchQuery={searchQuery}
        />
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
