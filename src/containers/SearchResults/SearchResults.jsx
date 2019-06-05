import React, { useState, Fragment, memo } from 'react';
import { compose, length, map, defaultTo, prop, toLower } from 'ramda';
import { useTranslation } from 'react-i18next';

import { Card, Loader, Modal } from 'components';
import SearchSidebar from 'containers/SearchSidebar';
import { useCurrentWidth, useEffectBoundary } from 'effects';
import { isMobile } from 'utils';

import { isActive } from 'store/common';

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

export const SearchResults = ({ searchByQuery, searchQuery, searchStatus, meta, result }) => {
  const { t } = useTranslation();

  useEffectBoundary(() => {
    searchByQuery(searchQuery);
  }, [searchQuery]);

  const [modalOpen, setModalOpen] = useState(false);
  const currentWidth = useCurrentWidth();

  const onClose = () => setModalOpen(false);
  const onOpen = () => setModalOpen(true);

  const count = length(result) || 0;
  const countTitle = `${count} ${t('result', { count })}`;
  const title = prop('isCountryMatch', meta) ? `${toLower(prop('term', meta))} - ${countTitle}` : countTitle;

  const renderResult = ({ uuid, ...hotel }) => (
    <Result to={`/hotels/${uuid}`} key={uuid}>
      <Card uuid={uuid} {...hotel} />
    </Result>
  );

  return (
    <Fragment>
      <StyledResults>
        <Loader text={t('messages.searching')} isLoading={isActive(searchStatus)} showPrev={true}>
          <ResultsTitle>{title}</ResultsTitle>
          {isMobile(currentWidth) && (
            <Filtering>
              <FiltersButton onClick={onOpen}>{t('buttons.refine')}</FiltersButton>
            </Filtering>
          )}
          <Results>{map(renderResult, defaultTo([], result))}</Results>
        </Loader>
      </StyledResults>
      {isMobile(currentWidth) && (
        <Modal open={modalOpen} modalContentProps={modalStyles} onClose={onClose}>
          <SearchSidebar />
        </Modal>
      )}
    </Fragment>
  );
};

SearchResults.propTypes = propTypes;
SearchResults.defaultProps = defaultProps;

export default compose(
  connect,
  memo
)(SearchResults);
