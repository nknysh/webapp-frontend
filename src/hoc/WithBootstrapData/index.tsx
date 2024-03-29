import React, { FormEvent } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getBootstrapExtraPersonSupplementProductSelector } from '../../store/modules/bootstrap/selectors';
import {
  getBootstrapCountriesSelector,
  getBootstrapHotelsSelector,
  bootstrapCountriesByRegionSelector,
} from 'store/modules/bootstrap/selectors';

// Connect to the store
// ---------------------------------------------------------------------------------------------------------------
export interface IStateToProps {
  bootstrapCountries: ReturnType<typeof getBootstrapCountriesSelector>;
  bootstrapCountriesByRegion: ReturnType<typeof bootstrapCountriesByRegionSelector>;
  bootstrapHotels: ReturnType<typeof getBootstrapHotelsSelector>;
  bootsrapExtraPersonSupplementId: ReturnType<typeof getBootstrapExtraPersonSupplementProductSelector>;
}
const mapStateToProps = createStructuredSelector({
  bootstrapCountries: getBootstrapCountriesSelector,
  bootstrapCountriesByRegion: bootstrapCountriesByRegionSelector,
  bootstrapHotels: getBootstrapHotelsSelector,
  bootsrapExtraPersonSupplementId: getBootstrapExtraPersonSupplementProductSelector,
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
