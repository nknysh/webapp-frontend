import React, { useState } from 'react';
import { compose, curry, length, map, path, defaultTo, prop } from 'ramda';

import { Card, Loader, Modal } from 'components';
import { SearchSidebar } from 'containers';
import { useCurrentWidth, useFetchData } from 'effects';
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

export const SearchResults = ({
  fetchSearch,
  getCountryName,
  getHotel,
  getResults,
  searchQuery,
  searchStatus,
  getHotelFeaturedPhoto,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const loaded = useFetchData(searchStatus, fetchSearch);

  const currentWidth = useCurrentWidth();

  const id = path(['search', 'id'], searchQuery);
  const results = getResults(IndexTypes.HOTELS);

  const count = length(results) || 0;
  const destinationTitle = getCountryName(id) || '';
  const countTitle = `${count} ${getPluralisation('result', count)}`;
  const title = destinationTitle ? `${destinationTitle} - ${countTitle}` : countTitle;

  const onClose = () => setModalOpen(false);
  const onOpen = () => setModalOpen(true);

  const renderResult = curry((selector, hit) => {
    const id = prop('ref', hit);

    return (
      id && (
        <Result to={`/hotels/${id}`} key={id}>
          <Card {...selector(id)} featuredPhoto={getHotelFeaturedPhoto(id)} />
        </Result>
      )
    );
  });

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
  React.memo,
  withSearchIndexes([IndexTypes.HOTELS]),
  connect
)(SearchResults);
