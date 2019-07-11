import React, { Fragment, memo } from 'react';
import { compose, length, map, defaultTo, prop, toLower } from 'ramda';
import { useTranslation } from 'react-i18next';

import { Card, Loader, Modal } from 'components';
import SearchSidebar from 'containers/SearchSidebar';
import { useCurrentWidth, useEffectBoundary, useModalState } from 'effects';

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
  SearchMarkdown,
} from './SearchResults.styles';

export const SearchResults = ({ searchByQuery, searchQuery, searchStatus, meta, result, canSearch }) => {
  const { t } = useTranslation();

  useEffectBoundary(() => {
    searchByQuery(searchQuery);
  }, [searchQuery]);

  const { modalOpen, onModalOpen, onModalClose } = useModalState(false);
  const { isMobile } = useCurrentWidth();

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
          {isMobile && (
            <Filtering>
              <FiltersButton onClick={onModalOpen}>{t('buttons.refine')}</FiltersButton>
            </Filtering>
          )}
          {canSearch ? (
            <Fragment>
              <ResultsTitle>{title}</ResultsTitle>
              <Results>{map(renderResult, defaultTo([], result))}</Results>
            </Fragment>
          ) : (
            <SearchMarkdown>{t('content.searchRequired')}</SearchMarkdown>
          )}
        </Loader>
      </StyledResults>
      {isMobile && (
        <Modal open={modalOpen} modalContentProps={modalStyles} onClose={onModalClose}>
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
