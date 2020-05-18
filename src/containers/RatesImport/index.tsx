import React, { Fragment } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { mapObjIndexed } from 'ramda';

import { EImportEntity } from '../../store/modules/importer/model';

import {
  importPageLoaded,
  importPageUnloaded,
  openImportConfirmationModal,
  confirmImportIntent,
  cancelImportIntent,
  forEntity
} from '../../store/modules/importer/actions';

import {
  importRequestIsPendingSelectorFactory,
  errorSelectorFactory,
  latestStatusSelectorFactory,
  workbookIdSelectorFactory,
  confirmationModalOpenSelectorFactory
} from '../../store/modules/importer/selectors';

import { ratesImportDomainSelector } from '../../store/modules/ratesImport/selectors';

import { MainStyles } from './styles';
import { PrimaryButton } from 'pureUi/Buttons';

import Separator from './components/Separator';
import Report from './components/Report';
import LatestStatusInfo from './components/LatestStatusInfo';
import ConfirmationModal from './components/ConfirmationModal';

export class RatesImportContainer extends React.Component<IRatesImportProps> {

  componentWillMount() {
    this.props.importPageLoaded();
  }

  componentWillUnmount() {
    this.props.importPageUnloaded();
  }

  render() {
    const {
      importRequestIsPending,
      latestStatus,
      confirmationModalOpen,
      openImportConfirmationModal,
      confirmImportIntent,
      cancelImportIntent,
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
              disabled={importRequestIsPending}
              onClick={openImportConfirmationModal}
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
              onOk={confirmImportIntent}
              onCancel={cancelImportIntent}
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
  importRequestIsPending: importRequestIsPendingSelectorFactory(ratesImportDomainSelector),
  error: errorSelectorFactory(ratesImportDomainSelector),
  latestStatus: latestStatusSelectorFactory(ratesImportDomainSelector),
  confirmationModalOpen: confirmationModalOpenSelectorFactory(ratesImportDomainSelector),
  workbookId: workbookIdSelectorFactory(ratesImportDomainSelector),
});

const actionCreators = mapObjIndexed(
  forEntity(EImportEntity.RATES),
  {
    importPageLoaded,
    importPageUnloaded,
    openImportConfirmationModal,
    confirmImportIntent,
    cancelImportIntent,
  }
);

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------

const withConnect = connect<StateToProps, DispatchToProps, IRatesImportProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const RatesImportContainerConnected = withConnect(RatesImportContainer);
