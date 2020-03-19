import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  ratesImportPageLoaded,
  ratesImportPageUnloaded,
  openRatesImportConfirmationModal,
  confirmRatesImportIntent,
  cancelRatesImportIntent,
} from '../../store/modules/ratesImport/actions';

import {
  importRatesRequestIsPendingSelector,
  errorSelector,
  latestStatusSelector,
  confirmationModalOpenSelector,
} from '../../store/modules/ratesImport/selectors';

import { MainStyles } from './styles';
import { PrimaryButton } from 'pureUi/Buttons';

import Separator from './components/Separator';
import Report from './components/Report';
import LatestStatusInfo from './components/LatestStatusInfo';
import ConfirmationModal from './components/ConfirmationModal';

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
      latestStatus,
      confirmationModalOpen,
      openRatesImportConfirmationModal,
      confirmRatesImportIntent,
      cancelRatesImportIntent,
    } = this.props;

    return (
      <MainStyles>
        <section className="controls">
          <PrimaryButton
            className="importBtn"
            disabled={importRatesRequestIsPending}
            onClick={openRatesImportConfirmationModal}
          >
            Import Rates
          </PrimaryButton>
          {latestStatus &&
            <LatestStatusInfo status={latestStatus} />
          }
        </section>
        <Separator className="separator" />
        <section className="report">
          {latestStatus && latestStatus.data &&
            <Report data={latestStatus.data} />
          }
        </section>
        {confirmationModalOpen &&
          <ConfirmationModal
            onOk={confirmRatesImportIntent}
            onCancel={cancelRatesImportIntent}
          />
        }
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
  confirmationModalOpen: confirmationModalOpenSelector,
});

const actionCreators = {
  ratesImportPageLoaded,
  ratesImportPageUnloaded,
  openRatesImportConfirmationModal,
  confirmRatesImportIntent,
  cancelRatesImportIntent,
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
