import React, { Fragment } from 'react';
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
  workbookIdSelector
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
      workbookId
    } = this.props;

    const workbookUrl = workbookId
      ? `https://docs.google.com/spreadsheets/d/${workbookId}/edit`
      : null;

    return (
      <MainStyles>
        <div className="importer">
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
          
          {latestStatus && latestStatus.data && (
            <Fragment>
              <Separator className="separator" />
              <section className="report">
                <Report data={latestStatus.data} />
              </section>
            </Fragment>
          )}
          
          {confirmationModalOpen &&
            <ConfirmationModal
              onOk={confirmRatesImportIntent}
              onCancel={cancelRatesImportIntent}
            />
          }
        </div>
        {workbookUrl && (
          <Fragment>
            <Separator className="separator" />
            <div className="editor">
              <iframe src={workbookUrl}/>
            </div>
          </Fragment>
        )}
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
  workbookId: workbookIdSelector
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
