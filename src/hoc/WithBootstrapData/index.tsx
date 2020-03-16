import React, { FormEvent } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getBootstrapCountriesSelector, getBootstrapHotelsSelector } from 'store/modules/bootstrap/selectors';

// Connect to the store
// ---------------------------------------------------------------------------------------------------------------
export interface IStateToProps {
  bootstrapCountries: ReturnType<typeof getBootstrapCountriesSelector>;
  bootstrapHotels: ReturnType<typeof getBootstrapHotelsSelector>;
}
const mapStateToProps = createStructuredSelector({
  bootstrapCountries: getBootstrapCountriesSelector,
  bootstrapHotels: getBootstrapHotelsSelector,
});

export interface IWithBootstrapDataProps extends IStateToProps {}

// ----------------------------------------------------------
// For testing purposes, create the class with a function so
// we can test the unconnected version
// ----------------------------------------------------------
export const makeWithBooktstrapData = (WrappedComponent: any) =>
  class WithBootstrapData extends React.Component<IWithBootstrapDataProps, {}> {
    static displayName = `WithBootstrapData(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export const withBootstapData = () => WrappedComponent => {
  const instance = makeWithBooktstrapData(WrappedComponent);
  const withConnect = connect<IWithBootstrapDataProps, IStateToProps, null>(mapStateToProps);

  const composed = compose(withConnect)(instance);

  return hoistNonReactStatics(composed, WrappedComponent);
};
