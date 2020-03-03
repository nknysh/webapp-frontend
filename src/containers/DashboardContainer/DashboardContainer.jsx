import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { equals, map, partial, values, prop, compose, isEmpty } from 'ramda';
import { Loader, Table, TableData, TableShowButton, Container } from '@pure-escapes/webapp-ui-components';

import { ADMIN_BASE_URL } from 'config';
import { BookingStatusTypes } from 'config/enums';
import { useFetchData } from 'effects';

import connect from './DashboardContainer.state';
import { propTypes, defaultProps } from './DashboardContainer.props';
import { Dashboard, DashboardContent, Sidebar, SidebarItem, ShowAll } from './DashboardContainer.styles';
import BookingStatus from 'pureUi/BookingStatus';

const renderSidebarItem = (t, { tableContext, setTableContext }, status) => (
  <SidebarItem data-active={equals(status, tableContext)} key={status} onClick={() => setTableContext(status)}>
    {t(`labels.latestTa.${status}`)}
  </SidebarItem>
);

const renderSidebarLinks = (t, props) => values(map(partial(renderSidebarItem, [t, props]), BookingStatusTypes));

const BookingStatusTableData = ({ record }) => (record ? <BookingStatus status={record.status} /> : null);

export const DashboardContainer = ({ bookingsStatus, fetchBookings, bookings }) => {
  const { t } = useTranslation();
  const [tableContext, setTableContext] = useState(BookingStatusTypes.POTENTIAL);
  const loaded = useFetchData(bookingsStatus, fetchBookings, undefined, [isEmpty(bookings)]);
  return (
    <Container>
      <Dashboard>
        <Sidebar title={t('labels.dashboard')} links={renderSidebarLinks(t, { tableContext, setTableContext })} />
        <DashboardContent>
          <Loader isLoading={!loaded}>
            <Table title={t(`labels.latestTa.${tableContext}`)} data={prop(tableContext, bookings)}>
              <TableData label={t('labels.uuid')} source="uuid" />
              <TableData label={t('hotel')} source="hotelName" />
              <TableData
                label={t('travelAgent')}
                source={['travelAgentUserUuid.firstName', 'travelAgentUserUuid.lastName']}
              />
              <BookingStatusTableData label={t('Status')} />
              <TableShowButton source="uuid" basePath="/bookings" />
            </Table>
          </Loader>
          <ShowAll inverse href={`${ADMIN_BASE_URL}/bookings`}>
            {t('labels.viewAllBookings')}
          </ShowAll>
        </DashboardContent>
      </Dashboard>
    </Container>
  );
};

DashboardContainer.propTypes = propTypes;
DashboardContainer.defaultProps = defaultProps;

BookingStatusTableData.propTypes = propTypes;
BookingStatusTableData.defaultProps = defaultProps;

export default compose(connect)(DashboardContainer);
