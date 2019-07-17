import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { compose, values, propOr } from 'ramda';
import { useTranslation } from 'react-i18next';

import { IndexTypes, SearchPatterns } from 'config/enums';
import { Search, SearchFilters, OccasionsSelect } from 'components';
import { useEffectBoundary } from 'effects';
import { buildQueryString } from 'utils';

import connect from './SearchSidebar.state';
import { propTypes, defaultProps } from './SearchSidebar.props';
import { Section, Title } from './SearchSidebar.styles';

export const SearchSidebar = ({
  features,
  getCountryName,
  getHotelName,
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
}) => {
  const { t } = useTranslation();

  useEffectBoundary(() => {
    history.push(`/search?${buildQueryString(searchQuery)}`);
  }, [searchQuery]);

  return (
    <Fragment>
      <Section>
        <Title>{t('labels.searching')}</Title>
        <Search
          indexes={values(IndexTypes)}
          indexSelectors={[getCountryName, getHotelName]}
          searchPatterns={[SearchPatterns.COUNTRIES]}
          onChange={setSearchQuery}
          onSearch={searchByName}
          showSubmit={false}
          searchStatus={searchStatus}
          searchQuery={searchQuery}
          vertical={true}
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
