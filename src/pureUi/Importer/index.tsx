import React, { Fragment } from 'react';

import { MainStyles } from './styles';
import { PrimaryButton } from 'pureUi/Buttons';

import Separator from './components/Separator';
import Report from './components/Report';
import LatestStatusInfo from './components/LatestStatusInfo';
import ConfirmationModal from './components/ConfirmationModal';

import { IWithImporterProps } from 'hoc/WithImporter';

export default class Importer extends React.Component<IImportProps> {

  componentWillMount() {
    this.props.importPageLoaded();
  }

  componentWillUnmount() {
    this.props.importPageUnloaded();
  }

  render() {
    const {
      className,
      entityName,
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
      <MainStyles className={className}>
        <div className="importer">
          <section className="controls">
            <PrimaryButton
              className="importBtn"
              disabled={importRequestIsPending}
              onClick={openImportConfirmationModal}
            >
              Import {entityName}
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
              entityName={entityName}
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

export interface IImportProps extends IWithImporterProps {
  className?: string;
  entityName: string;
}
