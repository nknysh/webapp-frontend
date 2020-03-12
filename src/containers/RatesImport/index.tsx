import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  importRatesRequestAction,
  ratesImportPageLoaded,
  ratesImportPageUnloaded
} from '../../store/modules/ratesImport/actions';

import {
  importRatesRequestIsPendingSelector,
  errorSelector,
  latestStatusSelector,
} from '../../store/modules/ratesImport/selectors';


export class RatesImportContainer extends React.Component<IRatesImportProps> {

  componentWillMount() {
    this.props.ratesImportPageLoaded();
  }

  componentWillUnmount() {
    this.props.ratesImportPageUnloaded();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.importRatesRequestAction()}>import rates</button>
        <div>is pending: {this.props.importRatesRequestIsPending ? 'true' : 'false'}</div>
        <div>latest status: {JSON.stringify(this.props.latestStatus)}</div>
        <div>error: {this.props.error || 'null'}</div>
      </div>
    );
  }

}

// -----------------------------------------------------------------------------
// Prop Typings
// -----------------------------------------------------------------------------
export type StateToProps = ReturnType<typeof mapStateToProps>;
export type DispatchToProps = typeof actionCreators;

export interface IRatesImportProps extends StateToProps, DispatchToProps {
  className?: string;
}

const mapStateToProps = createStructuredSelector({ 
  importRatesRequestIsPending: importRatesRequestIsPendingSelector,
  error: errorSelector,
  latestStatus: latestStatusSelector,
});

const actionCreators = {
  importRatesRequestAction,
  ratesImportPageLoaded,
  ratesImportPageUnloaded
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------

const withConnect = connect<StateToProps, DispatchToProps, IRatesImportProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const RatesImportContainerConnected = withConnect(RatesImportContainer);
