import React, { useState, useEffect } from 'react';
import { compose, curry, head, length, map, path, pipe, pathOr, prop, propOr } from 'ramda';

import { Card, Loader, Modal } from 'components';
import { SearchSidebar } from 'containers';
import { useFetchData, useCurrentWidth } from 'effects';
import { withSearchIndexes } from 'hoc';
import {
  filterByRange,
  isMobile,
  queryAvailable,
  queryFilterRegions,
  queryHoneymooners,
  queryPreferred,
  querySearchType,
  searchByQueries,
  toList,
} from 'utils';

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

const buildSearchQueries = (searchQuery, { regions }) =>
  toList(
    queryFilterRegions(pathOr({}, ['filters', 'regions'], searchQuery), regions),
    querySearchType(propOr({}, 'search', searchQuery)),
    queryPreferred(),
    queryHoneymooners(searchQuery),
    queryAvailable()
  );

export const SearchResults = ({
  searchQuery,
  indexes,
  hotels,
  destinations,
  getHotel,
  fetchDestinations,
  fetchHotels,
  getDestinationTitle,
  regions,
}) => {
  useFetchData(fetchDestinations, destinations);
  useFetchData(fetchHotels, hotels);

  const currentWidth = useCurrentWidth();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQueries, setSearchQueries] = useState([]);

  const hotelsIdx = head(indexes);

  useEffect(() => {
    setSearchQueries(buildSearchQueries(searchQuery, { regions }));
  }, [searchQuery]);

  if (!hotels || !destinations) return <Loader />;

  const id = path(['search', 'id'], searchQuery);

  const getResults = pipe(
    searchByQueries,
    filterByRange(getHotel, pathOr([], ['filters', 'prices'], searchQuery), 'listPrice')
  );

  const results = getResults(hotelsIdx, searchQueries);
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
