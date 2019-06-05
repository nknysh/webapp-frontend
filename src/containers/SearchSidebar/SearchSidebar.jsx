import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { compose, values } from 'ramda';
import { useTranslation } from 'react-i18next';

import { IndexTypes } from 'config/enums';
import { Search, SearchFilters } from 'components';
import { useEffectBoundary } from 'effects';
import { buildQueryString } from 'utils';

import connect from './SearchSidebar.state';
import { propTypes, defaultProps } from './SearchSidebar.props';
import { Section, Title } from './SearchSidebar.styles';

export const SearchSidebar = ({
  getCountryName,
  getHotelName,
  searchQuery,
  setSearchQuery,
  searchFiltersReset,
  history,
  regions,
  starRatings,
  features,
  searchByName,
  searchStatus,
  prices,
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
          searchPatterns={['+isDestination:true']}
          onChange={setSearchQuery}
          onSearch={searchByName}
          showSubmit={false}
          searchStatus={searchStatus}
          searchQuery={searchQuery}
          vertical={true}
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
