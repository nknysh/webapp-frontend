import React, { Fragment, memo } from 'react';
import { compose, length, map, defaultTo, prop, toLower } from 'ramda';
import { useTranslation } from 'react-i18next';
import { Loader, Modal } from '@pure-escapes/webapp-ui-components';

import SearchResult from 'containers/SearchResult';
import SearchSidebar from 'containers/SearchSidebar';
import { useCurrentWidth, useModalState } from 'effects';

import { isActive } from 'store/common';

import connect from './SearchResults.state';
import { propTypes, defaultProps } from './SearchResults.props';
import {
  StyledResults,
  ResultsTitle,
  Results,
  ResultWrapper,
  Filtering,
  FiltersButton,
  modalStyles,
  SearchMarkdown,
} from './SearchResults.styles';

const renderResult = ({ uuid, ...hotel }) => (
  <ResultWrapper key={uuid}>
    <SearchResult key={uuid} id={uuid} {...hotel} />
  </ResultWrapper>
);

export const SearchResults = ({ searchStatus, meta, result, canSearch }) => {
  const { t } = useTranslation();

  const { modalOpen, onModalOpen, onModalClose } = useModalState(false);
  const { isMobile } = useCurrentWidth();

  const count = length(result) || 0;
  const countTitle = `${count} ${t('result', { count })}`;

  // If a country match then show the country name in the title
  const title = prop('isCountryMatch', meta) ? `${toLower(prop('term', meta))} - ${countTitle}` : countTitle;

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

export default compose(connect, memo)(SearchResults);
