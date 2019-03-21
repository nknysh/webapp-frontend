import React from 'react';
import { compose, path } from 'ramda';

import { Loader } from 'components';
import { SearchSidebar, SearchResults } from 'containers';
import { useCurrentWidth, useFetchData } from 'effects';
import { isMobile } from 'utils';

import uiConfig from 'config/ui';

import connect from './SearchContainer.state';
import { propTypes, defaultProps } from './SearchContainer.props';
import {
  StyledSearch,
  BackButton,
  BackButtonWrapper,
  Columns,
  ColumnLeft,
  ColumnRight,
  Navigation,
} from './SearchContainer.styles';

export const SearchContainer = ({ fetchHotels, hotels, countries, searchQuery, hotelsStatus }) => {
  const hotelsLoaded = useFetchData(hotelsStatus, fetchHotels);
  const currentWidth = useCurrentWidth();

  return (
    <Loader isLoading={!hotelsLoaded}>
      <StyledSearch>
        <Columns>
          {!isMobile(currentWidth) && (
            <ColumnLeft>
              <Navigation to="/">
                <BackButtonWrapper>
                  <BackButton>keyboard_arrow_left</BackButton>
                </BackButtonWrapper>
                {path(['labels', 'backToHome'], uiConfig)}
              </Navigation>
              <SearchSidebar hotels={hotels} countries={countries} searchQuery={searchQuery} />
            </ColumnLeft>
          )}
          <ColumnRight>
            <SearchResults />
          </ColumnRight>
        </Columns>
      </StyledSearch>
    </Loader>
  );
};

SearchContainer.propTypes = propTypes;
SearchContainer.defaultProps = defaultProps;

export default compose(connect)(SearchContainer);