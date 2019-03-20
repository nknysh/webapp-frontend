import React, { useState } from 'react';
import { compose, curry, length, map, path, prop, defaultTo } from 'ramda';

import { Card, Loader, Modal } from 'components';
import { SearchSidebar } from 'containers';
import { useCurrentWidth, useFetchDataMultiple } from 'effects';
import { withSearchIndexes } from 'hoc';
import { isMobile, IndexTypes } from 'utils';

import uiConfig, { getPluralisation } from 'config/ui';

import connect from './SearchResults.state';
import { propTypes, defaultProps } from './SearchResults.props';
import {
  StyledResults,
  ResultsTitle,
  Results,
  Result,
  Filtering,
  FiltersButton,
  modalStyles,
} from './SearchResults.styles';

const renderResult = curry((selector, hit) => {
  const ref = prop('ref', hit);

  return (
    <Result to={`/hotels/${ref}`} key={ref}>
      <Card hotel={selector(ref)} />
    </Result>
  );
});

export const SearchResults = ({
  searchQuery,
  getHotel,
  getCountryName,
  hotelsStatus,
  fetchHotels,
  fetchResults,
  results,
  resultsStatus,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const loaded = useFetchDataMultiple([
    [hotelsStatus, fetchHotels],
    [resultsStatus, fetchResults, { index: 'hotels' }, searchQuery],
  ]);

  const currentWidth = useCurrentWidth();

  const id = path(['search', 'id'], searchQuery);

  const count = length(results);
  const destinationTitle = getCountryName(id) || '';
  const countTitle = `${count} ${getPluralisation('result', count)}`;
  const title = destinationTitle ? `${destinationTitle} - ${countTitle}` : countTitle;

  const onClose = () => setModalOpen(false);
  const onOpen = () => setModalOpen(true);

  return (
    <Loader isLoading={!loaded} text={path(['messages', 'searching'], uiConfig)}>
      <StyledResults>
        <ResultsTitle>{title}</ResultsTitle>
        {isMobile(currentWidth) && (
          <Filtering>
            <FiltersButton onClick={onOpen}>{path(['buttons', 'refine'], uiConfig)}</FiltersButton>
            <Modal open={modalOpen} modalContentProps={modalStyles} onClose={onClose}>
              <SearchSidebar />
            </Modal>
          </Filtering>
        )}
        <Results>{map(renderResult(getHotel), defaultTo([], results))}</Results>
      </StyledResults>
    </Loader>
  );
};

SearchResults.propTypes = propTypes;
SearchResults.defaultProps = defaultProps;

export default compose(
  withSearchIndexes([IndexTypes.HOTELS]),
  connect
)(SearchResults);
