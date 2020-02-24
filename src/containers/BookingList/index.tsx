import React, { FormEvent } from 'react';
import { Table, THead, TBody, TRow, TH, TD } from 'pureUi/Table';
import { LinkButton } from 'pureUi/Buttons';
import { BookingListStylesWrapper } from './BookingListStylesWrapper';
import { Heading2 } from 'styles';
import TextInput from 'pureUi/TextInput';
import { Pagination } from 'pureUi/Pagination';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { IBookingsListItem } from 'services/BackendApi/types/BookingsListResponse';
import { Search } from '@material-ui/icons';
import { formatDate } from 'utils';
import Select from 'pureUi/Select';

import { getUserCountryContext, isSR } from 'store/modules/auth';

import {
  requestPendingSelector,
  errorSelector,
  bookingsSelector,
  filterSelector,
  currentPageSelector,
  totalResultsSelector,
  sortBySelector,
  sortOrderSelector,
  pageCountSelector,
  selectedHotelSelector,
  selectedStatusSelector,
  selectedTravelAgentUuidSelector,
  hotelNameOptionsSelector,
} from 'store/modules/bookingsList/selectors';

import {
  getBookingListRequestAction,
  setFilterAction,
  setPageNumberAction,
  setSortAction,
  setSelectedTravelAgentAction,
  setSelectedHotelAction,
  setSelectedStatusAction,
  getHotelNamesRequestAction,
} from 'store/modules/bookingsList/actions';

import { makeBackendApi } from 'services/BackendApi';
import { getTravelAgentsRequestAction } from '../../store/modules/agents/actions';
import { travelAgentSelectOptionsSelector } from '../../store/modules/agents/selectors';
import { IValueLabelPair } from '../../interfaces';
import { EBookingStatus } from '../../services/BackendApi/types/BookingsListResponse';

export class BookingListContainer extends React.Component<IBookingListProps, {}> {
  bookingStatusOptions: IValueLabelPair[] = [
    { value: '', label: 'All Statuses' },
    { value: 'potential', label: 'Enquiries' },
    { value: 'requested', label: 'Requested' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  componentDidMount() {
    this.props.getBookingListRequest();
    this.props.getHotelNames();
    if (this.props.isSr) {
      this.props.getTravelAgents();
    }
  }

  handleFilterChange = (e: FormEvent<HTMLInputElement>) => {
    this.props.setFilter(e.currentTarget.value);
  };

  handleSort = (sortBy: keyof IBookingsListItem) => () => {
    const newSortOrder = sortBy === this.props.sortBy && this.props.sortOrder === 'asc' ? 'desc' : 'asc';
    this.props.setSort(sortBy, newSortOrder);
  };

  handlePageChange = (pageNumber: number) => {
    this.props.setPageNumber(pageNumber - 1);
  };

  getSortOrderForProp = (prop: keyof IBookingsListItem) =>
    this.props.sortBy === prop ? this.props.sortOrder : undefined;

  getHeadingText = () => {
    let headingText = 'Enquiries and Bookings - Loading...';
    if (!this.props.requestPending && this.props.totalResults > 0) {
      headingText = `Enquiries and Bookings - ${this.props.totalResults} ${
        this.props.totalResults === 1 ? 'Result' : 'Results'
      } Found.`;
    }

    if (!this.props.requestPending && this.props.totalResults === 0) {
      headingText = 'Enquiries and Bookings - No Results';
    }

    return headingText;
  };

  mapStatusToLabel = (bookingStatus: EBookingStatus) => {
    switch (bookingStatus) {
      case EBookingStatus.POTENTIAL:
        return 'Enquiry'
      default:
        return bookingStatus
    }
  }

  render() {
    return (
      <BookingListStylesWrapper>
        <Heading2 className="heading">{this.getHeadingText()}</Heading2>
        <div className="settings">
          <label>
            Hotel
            <Select
              value={this.props.selectedHotel || ''}
              options={this.props.hotelNameOptions}
              onChange={e => {
                this.props.setSelectedHotel(e.target.value);
              }}
            />
          </label>

          <label>
            Status
            <Select
              value={this.props.selectedStatus || ''}
              options={this.bookingStatusOptions}
              onChange={e => {
                this.props.setSelectedStatus(e.target.value);
              }}
            />
          </label>

          {this.props.isSr && (
            <label>
              Travel Agent
              <Select
                value={this.props.selectedTravelAgentUuid || ''}
                options={this.props.travelAgentSelectOptions}
                onChange={e => {
                  this.props.setSelectedTravelAgent(e.target.value);
                }}
              />
            </label>
          )}

          <label>
            Filter
            <TextInput
              className="filterInput"
              value={this.props.filter}
              onChange={this.handleFilterChange}
              placeholder="filter by ID or client"
            >
              <Search className="searchIcon"></Search>
            </TextInput>
          </label>
        </div>

        {!this.props.requestPending && this.props.totalResults > 0 && (
          <Table className="table">
            <THead>
              <TRow>
                <TH sortOrder={this.getSortOrderForProp('uuid')} onClick={this.handleSort('uuid')} className="id">
                  ID
                </TH>
                <TH
                  sortOrder={this.getSortOrderForProp('guestLastName')}
                  onClick={this.handleSort('guestLastName')}
                  className="client"
                >
                  Client
                </TH>
                <TH
                  sortOrder={this.getSortOrderForProp('createdAt')}
                  onClick={this.handleSort('createdAt')}
                  className="created"
                >
                  Created On
                </TH>
                <TH
                  sortOrder={this.getSortOrderForProp('hotelName')}
                  onClick={this.handleSort('hotelName')}
                  className="id"
                >
                  Hotel
                </TH>

                <TH
                  sortOrder={this.getSortOrderForProp('status')}
                  onClick={this.handleSort('status')}
                  className="comments"
                >
                  Status
                </TH>
                {this.props.isSr && <TH>Travel Agent</TH>}
                <TH className="actions">Actions</TH>
              </TRow>
            </THead>
            <TBody tableData={this.props.bookings!}>
              {(booking: IBookingsListItem) => {
                return (
                  <TRow key={booking.uuid}>
                    <TD title={booking.uuid}>{booking.uuid}</TD>
                    <TD>{`${booking.guestFirstName || ''} ${booking.guestLastName || ''}`.trimLeft()}</TD>
                    <TD>{formatDate(booking.createdAt, 'dd MMM yyyy')}</TD>
                    <TD>{booking.hotelName}</TD>
                    <TD>{this.mapStatusToLabel(booking.status).toUpperCase()}</TD>
                    {this.props.isSr && (
                      <TD>
                        {booking.travelAgent.title}. {booking.travelAgent.firstName} {booking.travelAgent.lastName}
                      </TD>
                    )}
                    <TD>
                      <LinkButton to={`/bookings/${booking.uuid}`}>Details</LinkButton>
                    </TD>
                  </TRow>
                );
              }}
            </TBody>
          </Table>
        )}

        {this.props.pageCount > 1 && (
          <Pagination
            className="pagination"
            onPageSelect={this.handlePageChange}
            pageCount={this.props.pageCount}
            currentPage={this.props.currentPage + 1}
          />
        )}
      </BookingListStylesWrapper>
    );
  }
}

// -----------------------------------------------------------------------------
// Prop Typings
// -----------------------------------------------------------------------------
export type StateToProps = ReturnType<typeof mapStateToProps>;
export type DispatchToProps = typeof actionCreators;
export interface IBookingListProps extends StateToProps, DispatchToProps {
  className: string;
  actingCountryCode: string;
  selectedTravelAgentUuid: string;
  selectedHotel: string;
  selectedStatus: string;
}

const mapStateToProps = createStructuredSelector({
  requestPending: requestPendingSelector,
  error: errorSelector,
  bookings: bookingsSelector,
  filter: filterSelector,
  totalResults: totalResultsSelector,
  sortBy: sortBySelector,
  sortOrder: sortOrderSelector,
  currentPage: currentPageSelector,
  pageCount: pageCountSelector,
  actingCountryCode: getUserCountryContext,
  selectedTravelAgentUuid: selectedTravelAgentUuidSelector,
  selectedHotel: selectedHotelSelector,
  selectedStatus: selectedStatusSelector,
  isSr: isSR,
  travelAgentSelectOptions: travelAgentSelectOptionsSelector,
  hotelNameOptions: hotelNameOptionsSelector,
});

const actionCreators = {
  getBookingListRequest: getBookingListRequestAction,
  setFilter: setFilterAction,
  setPageNumber: setPageNumberAction,
  setSort: setSortAction,
  setSelectedTravelAgent: setSelectedTravelAgentAction,
  setSelectedHotel: setSelectedHotelAction,
  setSelectedStatus: setSelectedStatusAction,
  getTravelAgents: getTravelAgentsRequestAction,
  getHotelNames: getHotelNamesRequestAction,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, IBookingListProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const BookingListConnected = compose(withConnect)(BookingListContainer);

export default BookingListConnected;
