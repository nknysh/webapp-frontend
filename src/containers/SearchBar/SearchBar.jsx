import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { compose, prop } from 'ramda';
import { Loader } from '@pure-escapes/webapp-ui-components';

import { Search } from 'components';
import { useFetchData } from 'effects';
import { buildQueryString } from 'utils';

import { propTypes, defaultProps } from './SearchBar.props';
import { StyledSearchBar } from './SearchBar.styles';
import connect from './SearchBar.state';

export const SearchBar = ({
  className,
  history,
  searchByName,
  searchQuery,
  nameSearchStatus,
  setSearchQuery,
  canSearch,
  ...props
}) => {
  useFetchData(nameSearchStatus, searchByName, [prop('destination', searchQuery) || { value: '' }]);

  // Push to history stack so the url is updated with the new query but a location change isn't triggered (which
  // would cause a full re-render of the search results)
  const onSubmit = useCallback(() => history.push(`/search?${buildQueryString(searchQuery)}`), [history, searchQuery]);

  return (
    <StyledSearchBar className={className}>
      <Loader isLoading={false} showSpinner={false}>
        <Search
          canSearch={canSearch}
          onChange={setSearchQuery}
          onSearch={searchByName}
          onSubmit={onSubmit}
          searchQuery={searchQuery}
          searchStatus={nameSearchStatus}
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
