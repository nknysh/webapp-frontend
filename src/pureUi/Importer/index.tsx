import React, { Fragment } from 'react';

import { MainStyles } from './styles';
import { PrimaryButton } from 'pureUi/Buttons';

import Separator from './components/Separator';
import Report from './components/Report';
import LatestStatusInfo from './components/LatestStatusInfo';
import ConfirmationModal from './components/ConfirmationModal';

import { IImportStatus } from 'services/BackendApi';

export class Importer extends React.Component<IImportProps> {

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

export interface IImportProps {
  className?: string;
  
  importRequestIsPending: boolean;
  latestStatus: IImportStatus | null;
  workbookId: string | null;
  confirmationModalOpen: boolean;

  importPageLoaded: () => void;
  importPageUnloaded: () => void;
  openImportConfirmationModal: () => void;
  confirmImportIntent: () => void;
  cancelImportIntent: () => void;
}

//TODO  pass entity name