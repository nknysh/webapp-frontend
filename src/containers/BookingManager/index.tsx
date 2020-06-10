import React from 'react';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { connect } from 'react-redux';

import { Header } from './Header';
import { Body } from './Body';
import { Sidebar } from './Sidebar';

import { ENetworkRequestStatus } from 'services/BackendApi';
import {
  getBookingRequestAction,
  requestToBookRequestAction,
  cancelRequestAction,
  confirmRequestAction,
} from 'store/modules/bookingManager/actions';

import {
  bookingSelector,
  bookingLoadSelector,
  leadGuestInformationSelector,
  requestToBookSelector,
  confirmSelector,
  cancelSelector,
  progressBarDataSelector,
  compactGuestBreakdownSelector,
} from 'store/modules/bookingManager/selectors';

import { isSR } from 'store/modules/auth';
import styled from 'styled-components';

export class BookingManagerContainerComponent extends React.Component<IBookingManagerContainerProps, {}> {
  componentDidMount() {
    this.props.getBookingRequest(this.props.match.params.bookingUuid);
  }

  render() {
    if (this.props.bookingLoadRequestStatus === ENetworkRequestStatus.PENDING) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
    if (this.props.bookingLoadRequestStatus === ENetworkRequestStatus.ERROR) {
      return (
        <div>
          <p>There was an error loading the booking. Please try again.</p>
        </div>
      );
    }

    return (
      <div className={this.props.className}>
        <Header
          booking={this.props.booking}
          leadGuestInformation={this.props.leadGuestInformation}
          compactGuestBreakdown={this.props.compactGuestBreakdown}
        />

        <main>
          <Sidebar />
          <Body
            booking={this.props.booking}
            requestToBookRequestStatus={this.props.requestToBookRequestStatus}
            confirmRequestStatus={this.props.confirmRequestStatus}
            cancelRequestStatus={this.props.cancelRequestStatus}
            progressBarData={this.props.progressBarData}
            leadGuestInformation={this.props.leadGuestInformation}
            isSr={this.props.isSr}
            requestToBookRequest={this.props.requestToBookRequest}
            cancelRequest={this.props.cancelRequest}
            confirmRequest={this.props.confirmRequest}
          />
        </main>
      </div>
    );
  }
}

// -----------------------------------------------------------------------------
// Prop Typings
// -----------------------------------------------------------------------------
export type StateToProps = ReturnType<typeof mapStateToProps>;
export type DispatchToProps = typeof actionCreators;
export interface IBookingManagerContainerProps extends StateToProps, DispatchToProps {
  className?: string;
  match: {
    params: {
      bookingUuid: string;
    };
  };
}

const mapStateToProps = createStructuredSelector({
  booking: bookingSelector,
  leadGuestInformation: leadGuestInformationSelector,
  isSr: isSR,

  bookingLoadRequestStatus: bookingLoadSelector,
  requestToBookRequestStatus: requestToBookSelector,
  confirmRequestStatus: confirmSelector,
  cancelRequestStatus: cancelSelector,
  progressBarData: progressBarDataSelector,
  compactGuestBreakdown: compactGuestBreakdownSelector,
});

const actionCreators = {
  getBookingRequest: getBookingRequestAction,
  requestToBookRequest: requestToBookRequestAction,
  cancelRequest: cancelRequestAction,
  confirmRequest: confirmRequestAction,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, IBookingManagerContainerProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const BookingManagerContainer = styled(BookingManagerContainerComponent)`
  main {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
  }
`;

export const BookingManagerContainerConnected = compose(withConnect)(BookingManagerContainer);
export default BookingManagerContainerConnected;
