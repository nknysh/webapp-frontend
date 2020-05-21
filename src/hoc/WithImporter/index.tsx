import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { mapObjIndexed } from 'ramda';

import { EImportEntity } from '../../store/modules/importer/model';
import { IImportStatus } from 'services/BackendApi';

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

import { ImportDomainSelector } from '../../store/modules/importer/selectors';

export interface IWithImporterProps {
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

const mapStateToProps = (domainSelector: ImportDomainSelector) =>
  createStructuredSelector({ 
    importRequestIsPending: importRequestIsPendingSelectorFactory(domainSelector),
    error: errorSelectorFactory(domainSelector),
    latestStatus: latestStatusSelectorFactory(domainSelector),
    confirmationModalOpen: confirmationModalOpenSelectorFactory(domainSelector),
    workbookId: workbookIdSelectorFactory(domainSelector),
  });

const actionCreators = (entity: EImportEntity) =>
  mapObjIndexed(
    forEntity(entity),
    {
      importPageLoaded,
      importPageUnloaded,
      openImportConfirmationModal,
      confirmImportIntent,
      cancelImportIntent,
    }
  );

const mapDispatchToProps = (entity: EImportEntity) =>
  (dispatch: Dispatch) => bindActionCreators(actionCreators(entity), dispatch);

export const makeWithImporter = (WrappedComponent: any) =>
  class WithImporter extends React.Component<IWithImporterProps> {
    static displayName = `WithImporter(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export const WithImporter = (entity: EImportEntity, domainSelector: ImportDomainSelector) =>
  WrappedComponent => {
    const instance = makeWithImporter(WrappedComponent);
    const withConnect = connect(mapStateToProps(domainSelector), mapDispatchToProps(entity));

    return hoistNonReactStatics(withConnect(instance), WrappedComponent);
  };