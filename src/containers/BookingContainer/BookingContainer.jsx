import React from 'react';
import { compose } from 'ramda';
import { useTranslation } from 'react-i18next';

import { Loader } from 'components';
import { useFetchData, useCurrentWidth } from 'effects';
import { isMobile } from 'utils';

import SummaryForm from 'containers/SummaryForm';

import connect from './BookingContainer.state';
import { propTypes, defaultProps } from './BookingContainer.props';
import { StyledBookingContainer, Main, Aside, Back } from './BookingContainer.styles';

const renderBackButton = t => <Back to="/search">{t('labels.backToSearch')}</Back>;

export const BookingContainer = ({ id, children, fetchBooking, status }) => {
  const { t } = useTranslation();
  const loaded = useFetchData(status, fetchBooking, [id]);
  const currentWidth = useCurrentWidth();

  return (
    <Loader isLoading={!loaded} text={t('messages.gettingBooking')}>
      <StyledBookingContainer>
        {isMobile(currentWidth) && renderBackButton(t)}
        <Main>{children}</Main>
        {!isMobile(currentWidth) && (
          <Aside>
            <SummaryForm id={id} summaryOnly />
          </Aside>
        )}
      </StyledBookingContainer>
    </Loader>
  );
};

BookingContainer.propTypes = propTypes;
BookingContainer.defaultProps = defaultProps;

export default compose(connect)(BookingContainer);
