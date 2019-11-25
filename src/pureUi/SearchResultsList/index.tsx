import React, { memo } from 'react';
import styled from 'styled-components';
import { HotelResult } from 'services/BackendApi';
import SearchResultHotel from 'pureUi/SearchResultHotel';

export interface SearchResultListProps {
  className?: string;
  searchResults: HotelResult[];
  expandedHighlights: string[];
  onToggleHighlights: (hotelUuid: string) => any;
  onNavigateToHotel: (hotelUuid: string) => void;
}

export const SearchResultList = memo((props: SearchResultListProps) => {
  return (
    <div className={props.className}>
      {props.searchResults.map(result => (
        <SearchResultHotel
          key={result.uuid}
          result={result}
          showHighlights={props.expandedHighlights.includes(result.uuid)}
          onToggleHighlights={props.onToggleHighlights}
          onNavigateToHotel={props.onNavigateToHotel}
        />
      ))}
    </div>
  );
});

export default styled(SearchResultList)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;
