import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { formatDateTimeDisplay } from 'utils/date';

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

import { EGenericStatusValue } from 'services/BackendApi';
import { MainStyles } from './styles';
import { PrimaryButton } from 'pureUi/Buttons';

const StatusLabels: { [key: string]: string; } = {
  [EGenericStatusValue.PENDING]: "Pending",
  [EGenericStatusValue.IN_PROGRESS]: "In Progress",
  [EGenericStatusValue.DONE]: "Done",
};

export class RatesImportContainer extends React.Component<IRatesImportProps> {

  componentWillMount() {
    this.props.ratesImportPageLoaded();
  }

  componentWillUnmount() {
    this.props.ratesImportPageUnloaded();
  }

  render() {
    const {
      importRatesRequestIsPending,
      importRatesRequestAction,
      latestStatus
    } = this.props;

    const statusStr = latestStatus
      ? `${StatusLabels[latestStatus.status]} (${formatDateTimeDisplay(latestStatus.createdAt)})`
      : null;

    return (
      <MainStyles>
        <section className="controls">
          <PrimaryButton
            className="importBtn"
            disabled={importRatesRequestIsPending}
            onClick={importRatesRequestAction}
          >
            Import Rates
          </PrimaryButton>
          <div>Latest import: {statusStr}</div>
        </section>
        <div className="separator" />
        <section className="results">
          {JSON.stringify(this.props.latestStatus)}
        </section>
      </MainStyles>
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
