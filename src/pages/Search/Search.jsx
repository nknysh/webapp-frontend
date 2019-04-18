import React from 'react';
import { path } from 'ramda';

import { SearchSidebar, SearchResults } from 'containers';
import { useCurrentWidth } from 'effects';
import { isMobile } from 'utils';

import uiConfig from 'config/ui';

import { StyledSearch, Columns, ColumnLeft, ColumnRight, Back } from './Search.styles';

export const Search = () => {
  const currentWidth = useCurrentWidth();

  return (
    <StyledSearch>
      <Columns>
        {!isMobile(currentWidth) && (
          <ColumnLeft>
            <Back to="/">{path(['labels', 'backToHome'], uiConfig)}</Back>
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

export default Search;
