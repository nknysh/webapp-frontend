import React, { FormEvent } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getBookingData, getBookingDataWithHolds } from 'store/modules/bookings/selectors';

const mapStateToProps = createStructuredSelector<any, any>({
  storeBookings: getBookingData,
  storeBookingsWithHolds: getBookingDataWithHolds,
});

const actionCreators = {};
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);
type IStateToProps = ReturnType<typeof mapStateToProps>;
type IDispatchToProps = typeof actionCreators;
export interface IWithBookingsProps extends IStateToProps, IDispatchToProps {}

export const makeWithBookings = (WrappedComponent: any) =>
  class WithBookings extends React.Component<IWithBookingsProps> {
    static displayName = `WithBookings(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export const WithBookings = WrappedComponent => {
  const instance = makeWithBookings(WrappedComponent);
  const withConnect = connect<IWithBookingsProps, IStateToProps, IDispatchToProps>(mapStateToProps, mapDispatchToProps);

  const composed = compose(withConnect)(instance);

  return hoistNonReactStatics(composed, WrappedComponent);
};

export default WithBookings;
