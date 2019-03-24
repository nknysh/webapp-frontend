import React from 'react';
import { compose, path } from 'ramda';

import { SearchSidebar, SearchResults } from 'containers';
import { useCurrentWidth } from 'effects';
import { isMobile } from 'utils';

import uiConfig from 'config/ui';

import connect from './SearchContainer.state';
import { propTypes, defaultProps } from './SearchContainer.props';
import { StyledSearch, Columns, ColumnLeft, ColumnRight, Back } from './SearchContainer.styles';

export const SearchContainer = ({ searchQuery }) => {
  const currentWidth = useCurrentWidth();

  return (
    <StyledSearch>
      <Columns>
        {!isMobile(currentWidth) && (
          <ColumnLeft>
            <Back to="/">{path(['labels', 'backToHome'], uiConfig)}</Back>
            <SearchSidebar searchQuery={searchQuery} />
          </ColumnLeft>
        )}
        <ColumnRight>
          <SearchResults />
        </ColumnRight>
      </Columns>
    </StyledSearch>
  );
};

SearchContainer.propTypes = propTypes;
SearchContainer.defaultProps = defaultProps;

export default compose(connect)(SearchContainer);
