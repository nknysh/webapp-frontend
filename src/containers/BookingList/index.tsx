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
} from 'store/modules/bookingsList/selectors';

import {
  getBookingListRequestAction,
  setFilterAction,
  setPageNumberAction,
  setSortAction,
  setSelectedTravelAgentAction,
  setSelectedHotelAction,
  setSelectedStatusAction,
} from 'store/modules/bookingsList/actions';

import { makeBackendApi } from 'services/BackendApi';

export class BookingListContainer extends React.Component<IBookingListProps, IBookingListState> {
  constructor(props) {
    super(props);
    this.state = {
      travelAgentsForSelect: [{ value: null, label: 'None Selected' }],
      hotelsForSelect: [{ value: null, label: 'None Selected' }],
      statusesForSelect: [
        { value: null, label: 'None Selected' },
        { value: 'potential', label: 'Potential' },
        { value: 'requested', label: 'Requested' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'cancelled', label: 'Cancelled' },
      ],
    };
  }

  componentDidMount() {
    this.props.getBookingListRequest();

    const backendApi = makeBackendApi(this.props.actingCountryCode);

    backendApi.getHotelsAsHotelNames().then(res => {
      const hotelsForSelect = res.data.data.map(hotel => {
        return {
          value: hotel.uuid,
          label: `${hotel.name}`,
        };
      });
      hotelsForSelect.unshift({ value: null, label: 'None Selected' });
      this.setState({
        hotelsForSelect,
      });
    });

    // if we're not an SR, we don't need the travel agents
    if (!this.props.isSr) {
      return;
    }

    backendApi.getTravelAgents().then(res => {
      const travelAgentsForSelect = res.data.data.map(ta => {
        return {
          value: ta.uuid,
          label: `${ta.title}. ${ta.firstName} ${ta.lastName}`,
        };
      });
      travelAgentsForSelect.unshift({ value: null, label: 'None Selected' });
      this.setState({
        travelAgentsForSelect,
      });
    });
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
    let headingText = 'Bookings - Loading...';
    if (!this.props.requestPending && this.props.totalResults > 0) {
      headingText = `Bookings - ${this.props.totalResults} ${
        this.props.totalResults === 1 ? 'Result' : 'Results'
      } Found.`;
    }

    if (!this.props.requestPending && this.props.totalResults === 0) {
      headingText = 'Bookings - No Results';
    }

    return headingText;
  };

  render() {
    return (
      <BookingListStylesWrapper>
        <Heading2 className="heading">{this.getHeadingText()}</Heading2>
        <div className="settings">
          <div>
            <label>Hotel</label>
            <Select
              value={this.props.selectedHotel || ''}
              options={this.state.hotelsForSelect}
              onChange={e => {
                this.props.setSelectedHotel(e.target.value);
              }}
            />
          </div>

          <div>
            <label>Status</label>
            <Select
              value={this.props.selectedStatus || ''}
              options={this.state.statusesForSelect}
              onChange={e => {
                this.props.setSelectedStatus(e.target.value);
              }}
            />
          </div>

          {this.props.isSr && (
            <div>
              <label>Travel Agent</label>
              <Select
                value={this.props.selectedTravelAgentUuid || ''}
                options={this.state.travelAgentsForSelect}
                onChange={e => {
                  this.props.setSelectedTravelAgent(e.target.value);
                }}
              />
            </div>
          )}

          <div>
            <label>Filter</label>
            <TextInput
              className="filterInput"
              value={this.props.filter}
              onChange={this.handleFilterChange}
              placeholder="filter by ID or client"
            >
              <Search className="searchIcon"></Search>
            </TextInput>
          </div>
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
                    <TD>{booking.status.toUpperCase()}</TD>
                    {booking.travelAgent && (
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

export interface IBookingListState {
  travelAgentsForSelect: any;
  hotelsForSelect: any;
  statusesForSelect: any;
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
});

const actionCreators = {
  getBookingListRequest: getBookingListRequestAction,
  setFilter: setFilterAction,
  setPageNumber: setPageNumberAction,
  setSort: setSortAction,
  setSelectedTravelAgent: setSelectedTravelAgentAction,
  setSelectedHotel: setSelectedHotelAction,
  setSelectedStatus: setSelectedStatusAction,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, IBookingListProps>(mapStateToProps, mapDispatchToProps);

export const BookingListConnected = compose(withConnect)(BookingListContainer);
