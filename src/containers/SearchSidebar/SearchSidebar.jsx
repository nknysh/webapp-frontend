import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { path, compose, values } from 'ramda';

import { Search, SearchFilters } from 'components';
import { useEffectBoundary } from 'effects';
import { buildQueryString, IndexTypes } from 'utils';

import uiConfig from 'config/ui';

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
}) => {
  useEffectBoundary(() => {
    history.push(`/search?${buildQueryString(searchQuery)}`);
  }, [searchQuery]);

  return (
    <Fragment>
      <Section>
        <Title>{path(['labels', 'searching'], uiConfig)}</Title>
        <Search
          indexes={values(IndexTypes)}
          indexSelectors={[getCountryName, getHotelName]}
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
