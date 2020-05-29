import React from 'react';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { PrimaryActionToolbar } from './PrimaryActionToolbar';
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
} from 'store/modules/bookingManager/selectors';

import { isSR } from 'store/modules/auth';
import styled from 'styled-components';

export class BookingManagerContainerComponent extends React.Component<IBookingManagerContainerProps, {}> {
  componentDidMount() {
    this.props.getBookingRequest(this.props.match.params.bookingUuid);
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.props.bookingLoadRequestStatus === ENetworkRequestStatus.PENDING && <p>Loading...</p>}

        {this.props.bookingLoadRequestStatus === ENetworkRequestStatus.ERROR && (
          <p>There was an error. Please refresh.</p>
        )}

        {this.props.bookingLoadRequestStatus === ENetworkRequestStatus.SUCCESS && (
          <div>
            <div className="booking-information">
              <label>Booking Status</label>
              <p>{this.props.booking.status}</p>
            </div>

            <div className="lead-guest-information">
              <p>{this.props.leadGuestInformation.guestTitle}</p>
              <p>{this.props.leadGuestInformation.guestFirstName}</p>
              <p>{this.props.leadGuestInformation.guestLastName}</p>
              <p>{this.props.leadGuestInformation.guestEmail}</p>
            </div>

            {this.props.requestToBookRequestStatus === ENetworkRequestStatus.PENDING ||
            this.props.confirmRequestStatus === ENetworkRequestStatus.PENDING ||
            this.props.cancelRequestStatus === ENetworkRequestStatus.PENDING ? (
              <p>Loading...</p>
            ) : (
              <React.Fragment>
                {this.props.requestToBookRequestStatus === ENetworkRequestStatus.ERROR && (
                  <p>There was an error while attempting to mark this booking as Requested. Please try again.</p>
                )}

                {this.props.cancelRequestStatus === ENetworkRequestStatus.ERROR && (
                  <p>There was an error while attempting to mark this booking as Cancelled. Please try again.</p>
                )}

                {this.props.confirmRequestStatus === ENetworkRequestStatus.ERROR && (
                  <p>There was an error while attempting to mark this booking as Confirmed. Please try again.</p>
                )}

                <PrimaryActionToolbar
                  booking={this.props.booking}
                  isSr={this.props.isSr}
                  requestToBookRequest={this.props.requestToBookRequest}
                  cancelRequest={this.props.cancelRequest}
                  confirmRequest={this.props.confirmRequest}
                />
              </React.Fragment>
            )}
          </div>
        )}
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
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 10px;
`;

export const BookingManagerContainerConnected = compose(withConnect)(BookingManagerContainer);
export default BookingManagerContainerConnected;
