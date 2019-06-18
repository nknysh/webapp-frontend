import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, prop, values } from 'ramda';

import { IndexTypes, SearchPatterns } from 'config/enums';
import { Loader, Search } from 'components';
import { useFetchData } from 'effects';
import { buildQueryString } from 'utils';

import { propTypes, defaultProps } from './SearchBar.props';
import { StyledSearchBar } from './SearchBar.styles';
import connect from './SearchBar.state';

export const SearchBar = ({
  className,
  getCountryName,
  getHotelName,
  history,
  searchByName,
  searchQuery,
  searchStatus,
  setSearchQuery,
  canSearch,
  ...props
}) => {
  useFetchData(searchStatus, searchByName, [prop('destination', searchQuery) || { value: '' }]);

  const onSubmit = () => history.push(`/search?${buildQueryString(searchQuery)}`);

  return (
    <StyledSearchBar className={className}>
      <Loader isLoading={false} showSpinner={false}>
        <Search
          canSearch={canSearch}
          indexes={values(IndexTypes)}
          indexSelectors={[getCountryName, getHotelName]}
          onChange={setSearchQuery}
          onSearch={searchByName}
          onSubmit={onSubmit}
          searchPatterns={[SearchPatterns.COUNTRIES]}
          searchQuery={searchQuery}
          searchStatus={searchStatus}
          {...props}
        />
      </Loader>
    </StyledSearchBar>
  );
};

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default compose(
  connect,
  withRouter
)(SearchBar);
