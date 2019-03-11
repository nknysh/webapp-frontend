import React from 'react';

import { SearchSidebar, SearchResults } from 'containers';
import { useCurrentWidth } from 'effects';
import { isMobile } from 'utils';

import { propTypes, defaultProps } from './Search.props';
import {
  StyledSearch,
  BackButton,
  BackButtonWrapper,
  Columns,
  ColumnLeft,
  ColumnRight,
  Navigation,
} from './Search.styles';

export const Search = () => {
  const currentWidth = useCurrentWidth();

  return (
    <StyledSearch>
      <Columns>
        {!isMobile(currentWidth) && (
          <ColumnLeft>
            <Navigation to="/">
              <BackButtonWrapper>
                <BackButton>keyboard_arrow_left</BackButton>
              </BackButtonWrapper>
              back to homepage
            </Navigation>
            <SearchSidebar />
          </ColumnLeft>
        )}
        <ColumnRight>
          <SearchResults />
        </ColumnRight>
      </Columns>
    </StyledSearch>
  );
};

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;
