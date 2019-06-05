import React from 'react';
import { useTranslation } from 'react-i18next';

import { SearchSidebar, SearchResults } from 'containers';
import { useCurrentWidth } from 'effects';
import { isMobile } from 'utils';

import { StyledSearch, Columns, ColumnLeft, ColumnRight, Back } from './Search.styles';

export const Search = () => {
  const { t } = useTranslation();
  const currentWidth = useCurrentWidth();

  return (
    <StyledSearch>
      <Columns>
        {!isMobile(currentWidth) && (
          <ColumnLeft>
            <Back to="/">{t('labels.backToHome')}</Back>
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
