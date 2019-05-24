import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, prop, values } from 'ramda';

import { Loader, Search } from 'components';
import { useFetchData } from 'effects';
import { buildQueryString, IndexTypes } from 'utils';

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
  ...props
}) => {
  useFetchData(searchStatus, searchByName, [prop('destination', searchQuery) || { value: '' }]);

  const onSubmit = () => history.push(`/search?${buildQueryString(searchQuery)}`);

  return (
    <StyledSearchBar className={className}>
      <Loader isLoading={false} showSpinner={false}>
        <Search
          indexes={values(IndexTypes)}
          indexSelectors={[getCountryName, getHotelName]}
          searchPatterns={['+isDestination:true']}
          onChange={setSearchQuery}
          onSearch={searchByName}
          onSubmit={onSubmit}
          searchStatus={searchStatus}
          searchQuery={searchQuery}
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
