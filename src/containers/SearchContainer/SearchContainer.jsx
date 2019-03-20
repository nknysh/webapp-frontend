import React from 'react';
import { compose, path } from 'ramda';

import { Loader } from 'components';
import { SearchSidebar, SearchResults } from 'containers';
import { useCurrentWidth, useFetchData } from 'effects';
import { isMobile } from 'utils';

import uiConfig from 'config/ui';

import connect from './SearchContainer.state';
import { propTypes, defaultProps } from './SearchContainer.props';
import { StyledSearch, Columns, ColumnLeft, ColumnRight, Back } from './SearchContainer.styles';

export const SearchContainer = ({ fetchHotels, hotels, countries, searchQuery, hotelsStatus }) => {
  const hotelsLoaded = useFetchData(hotelsStatus, fetchHotels, {}, true);
  const currentWidth = useCurrentWidth();

  return (
    <Loader isLoading={!hotelsLoaded}>
      <StyledSearch>
        <Columns>
          {!isMobile(currentWidth) && (
            <ColumnLeft>
              <Back to="/">{path(['labels', 'backToHome'], uiConfig)}</Back>
              <SearchSidebar hotels={hotels} countries={countries} searchQuery={searchQuery} />
            </ColumnLeft>
          )}
          <ColumnRight>
            <SearchResults hotels={hotels} />
          </ColumnRight>
        </Columns>
      </StyledSearch>
    </Loader>
  );
};

SearchContainer.propTypes = propTypes;
SearchContainer.defaultProps = defaultProps;

export default compose(connect)(SearchContainer);
