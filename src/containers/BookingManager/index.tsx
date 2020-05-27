import React from 'react';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { connect } from 'react-redux';

import { getBookingRequestAction } from 'store/modules/bookingManager/actions';
import { bookingSelector, statusSelector, leadGuestInformationSelector } from 'store/modules/bookingManager/selectors';

export class BookingManagerContainer extends React.Component<IBookingManagerContainerProps, {}> {
  componentDidMount() {
    this.props.getBookingRequest(this.props.match.params.bookingUuid);
  }

  render() {
    if (this.props.status === 'LOADING' || this.props.status === 'IDLE') {
      return <p>Loading...</p>;
    }
    if (this.props.status === 'ERROR') {
      return <p>There was an error. Please refresh.</p>;
    }
    if (this.props.status === 'LOADED') {
      return (
        <div>
          <p>{this.props.leadGuestInformation.guestTitle}</p>
          <p>{this.props.leadGuestInformation.guestFirstName}</p>
          <p>{this.props.leadGuestInformation.guestLastName}</p>
          <p>{this.props.leadGuestInformation.guestEmail}</p>
        </div>
      );
    }
  }
}

// -----------------------------------------------------------------------------
// Prop Typings
// -----------------------------------------------------------------------------
export type StateToProps = ReturnType<typeof mapStateToProps>;
export type DispatchToProps = typeof actionCreators;
export interface IBookingManagerContainerProps extends StateToProps, DispatchToProps {
  match: {
    params: {
      bookingUuid: string;
    };
  };
}

const mapStateToProps = createStructuredSelector({
  booking: bookingSelector,
  leadGuestInformation: leadGuestInformationSelector,
  status: statusSelector,
});

const actionCreators = {
  getBookingRequest: getBookingRequestAction,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, IBookingManagerContainerProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const BookingManagerContainerConnected = compose(withConnect)(BookingManagerContainer);

export default BookingManagerContainerConnected;
