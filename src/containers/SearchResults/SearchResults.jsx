import React, { useState } from 'react';
import { compose, path, cond, equals, always, map, head, replace, length, prop, curry, T, join } from 'ramda';

import { Card, Loader, Modal } from 'components';
import { SearchSidebar } from 'containers';
import { useFetchData, useCurrentWidth } from 'effects';
import { withSearchIndexes } from 'hoc';
import { toList, isMobile } from 'utils';

import uiConfig, { getPluralisation } from 'config/ui';
import theme from 'styles/theme';

import connect from './SearchResults.state';
import { propTypes, defaultProps } from './SearchResults.props';
import { StyledResults, ResultsTitle, Results, Result, Filtering, FiltersButton } from './SearchResults.styles';

const renderResult = curry((selector, hit) => {
  const ref = prop('ref', hit);

  return (
    <Result to={`/hotels/${ref}`} key={ref}>
      <Card hotel={selector(ref)} />
    </Result>
  );
});

const Types = {
  HOTELS: 'hotels',
  DESTINATIONS: 'destinations',
};

export const SearchResults = ({
  searchQuery,
  indexes,
  hotels,
  destinations,
  getHotel,
  fetchDestinations,
  fetchHotels,
  getDestinationTitle,
}) => {
  useFetchData(fetchDestinations, destinations);
  useFetchData(fetchHotels, hotels);

  const currentWidth = useCurrentWidth();
  const [modalOpen, setModalOpen] = useState(false);

  if (!hotels || !destinations) return <Loader />;

  const value = path(['search', 'value'], searchQuery);
  const id = path(['search', 'id'], searchQuery);
  const type = path(['search', 'type'], searchQuery);

  const honeymooners = path(['honeymooners'], searchQuery);

  const searchBy = cond([
    [equals(Types.DESTINATIONS), always(replace(/-/g, ' +', id || ''))],
    [equals(Types.HOTELS), always(replace(/ /g, ' +', value || ''))],
    [T, always('')],
  ]);

  const searchStringArr = toList(
    searchBy(type),
    // Push preferred to top
    'preferred:true',
    honeymooners ? '+suitableForHoneymooners:true' : '',
    // Only show available
    '+availableForOnlineBooking:true'
  );

  const searchString = join(' ', searchStringArr);
  const hotelsIdx = head(indexes);

  const results = hotelsIdx.search(searchString || '');
  const count = length(results);

  const destinationTitle = getDestinationTitle(id) || '';
  const countTitle = `${count} ${getPluralisation('result', count)}`;
  const title = destinationTitle ? `${destinationTitle} - ${countTitle}` : countTitle;

  return (
    <StyledResults>
      <ResultsTitle>{title}</ResultsTitle>
      {isMobile(currentWidth) && (
        <Filtering>
          <FiltersButton onClick={() => setModalOpen(true)}>{path(['buttons', 'refine'], uiConfig)}</FiltersButton>
          <Modal
            open={modalOpen}
            modalContentProps={{ style: { backgroundColor: theme.colors.whiteish, paddingTop: theme.gutter * 4 } }}
            onClose={() => setModalOpen(false)}
          >
            <SearchSidebar />
          </Modal>
        </Filtering>
      )}
      <Results>{map(renderResult(getHotel), results)}</Results>
    </StyledResults>
  );
};

SearchResults.propTypes = propTypes;
SearchResults.defaultProps = defaultProps;

export default compose(
  withSearchIndexes(['hotels']),
  connect
)(SearchResults);
