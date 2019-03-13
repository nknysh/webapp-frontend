import React, { useState } from 'react';
import { compose, curry, length, map, path, prop, isNil } from 'ramda';

import { Card, Loader, Modal } from 'components';
import { SearchSidebar } from 'containers';
import { useFetchData, useCurrentWidth } from 'effects';
import { withSearchIndexes } from 'hoc';
import { isMobile, IndexTypes } from 'utils';

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

export const SearchResults = ({
  searchQuery,
  hotels,
  getHotel,
  fetchHotels,
  getCountryName,
  fetchResults,
  results,
}) => {
  useFetchData(fetchHotels, hotels);
  useFetchData(fetchResults, hotels && results, { index: IndexTypes.HOTELS });

  const currentWidth = useCurrentWidth();
  const [modalOpen, setModalOpen] = useState(false);

  const id = path(['search', 'id'], searchQuery);

  const count = length(results);
  const destinationTitle = getCountryName(id) || '';
  const countTitle = `${count} ${getPluralisation('result', count)}`;
  const title = destinationTitle ? `${destinationTitle} - ${countTitle}` : countTitle;

  if (isNil(results)) return <Loader isLoading={true} text={path(['messages', 'searching'], uiConfig)} />;

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
  withSearchIndexes([IndexTypes.HOTELS]),
  connect
)(SearchResults);
