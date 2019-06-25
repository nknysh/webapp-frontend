import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { equals, map, partial, values, prop, compose, isEmpty } from 'ramda';

import { ADMIN_BASE_URL } from 'config';
import { BookingStatusTypes } from 'config/enums';
import { Table, Loader, TableData, TableDataStatus, TableShowButton } from 'components';
import { useFetchData } from 'effects';

import connect from './DashboardContainer.state';
import { propTypes, defaultProps } from './DashboardContainer.props';
import {
  StyledDashboardContainer,
  Dashboard,
  DashboardContent,
  Sidebar,
  SidebarItem,
  ShowAll,
} from './DashboardContainer.styles';

const renderSidebarItem = (t, { tableContext, setTableContext }, status) => (
  <SidebarItem data-active={equals(status, tableContext)} key={status} onClick={() => setTableContext(status)}>
    {t(`labels.latestTa.${status}`)}
  </SidebarItem>
);

const renderSidebarLinks = (t, props) => values(map(partial(renderSidebarItem, [t, props]), BookingStatusTypes));

export const DashboardContainer = ({ bookingsStatus, fetchBookings, bookings }) => {
  const { t } = useTranslation();
  const [tableContext, setTableContext] = useState(BookingStatusTypes.POTENTIAL);
  const loaded = useFetchData(bookingsStatus, fetchBookings, undefined, [isEmpty(bookings)]);

  return (
    <StyledDashboardContainer>
      <Dashboard>
        <Sidebar title={t('labels.dashboard')} links={renderSidebarLinks(t, { tableContext, setTableContext })} />
        <DashboardContent>
          <Loader isLoading={!loaded}>
            <Table title={t('labels.latestTaBookings')} data={prop(tableContext, bookings)}>
              <TableData label={t('labels.uuid')} source="uuid" />
              <TableData label={t('hotel')} source="hotelName" />
              <TableData
                label={t('travelAgent')}
                source={['travelAgentUserUuid.firstName', 'travelAgentUserUuid.lastName']}
              />
              <TableDataStatus label={t('labels.status')} source="status" />
              <TableShowButton source="uuid" basePath="/bookings" />
            </Table>
          </Loader>
          <ShowAll inverse href={`${ADMIN_BASE_URL}/bookings`}>
            {t('labels.viewAllBookings')}
          </ShowAll>
        </DashboardContent>
      </Dashboard>
    </StyledDashboardContainer>
  );
};

DashboardContainer.propTypes = propTypes;
DashboardContainer.defaultProps = defaultProps;
DashboardContainer.whyDidYouRender = defaultProps;

export default compose(connect)(DashboardContainer);
