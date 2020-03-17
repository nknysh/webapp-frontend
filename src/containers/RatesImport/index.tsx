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

import { MainStyles } from './styles';
import { PrimaryButton } from 'pureUi/Buttons';

import Separator from './components/Separator';
import Report from './components/Report';
import LatestStatusInfo from './components/LatestStatusInfo';
import ConfirmationModal from './components/ConfirmationModal';

interface IState {
  confirmationModalOpen: boolean;
}

export class RatesImportContainer extends React.Component<IRatesImportProps, IState> {

  state = {
    confirmationModalOpen: false
  };

  componentWillMount() {
    this.props.ratesImportPageLoaded();
  }

  componentWillUnmount() {
    this.props.ratesImportPageUnloaded();
  }

  onConfirmationModalOk = () => {
    const { importRatesRequestAction } = this.props;
    
    importRatesRequestAction();
    this.setState({ confirmationModalOpen: false  });
  };

  onConfirmaitonModalCancel = () => {
    this.setState({ confirmationModalOpen: false  });
  };

  render() {
    const {
      importRatesRequestIsPending,
      latestStatus
    } = this.props;

    const { confirmationModalOpen } = this.state;

    return (
      <MainStyles>
        <section className="controls">
          <PrimaryButton
            className="importBtn"
            disabled={importRatesRequestIsPending}
            onClick={() => this.setState({ confirmationModalOpen: true })}
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
            onOk={this.onConfirmationModalOk}
            onCancel={this.onConfirmaitonModalCancel}
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
