import React from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { IWithBootstrapDataProps, withBootstapData } from 'hoc/WithBootstrapData';

import {} from 'store/modules/offer/selectors';

import {} from 'store/modules/offer/actions';

import { OfferEditApplicationsStyles } from './OfferEditApplicationsStyles';
import { Heading } from '../../pureUi/typography/index';

export class OfferEditApplicationsContainer extends React.Component<IOfferEditPreRequisitesProps, {}> {
  render() {
    return (
      <OfferEditApplicationsStyles>
        <Heading level="h1">Applicaitons</Heading>
      </OfferEditApplicationsStyles>
    );
  }
}

// -----------------------------------------------------------------------------
// Prop Typings
// -----------------------------------------------------------------------------
export type StateToProps = ReturnType<typeof mapStateToProps>;
export type DispatchToProps = typeof actionCreators;

export interface IOfferEditPreRequisitesProps extends DispatchToProps, IWithBootstrapDataProps {}

const mapStateToProps = createStructuredSelector({});

const actionCreators = {};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, IOfferEditPreRequisitesProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const OfferEditApplicationsContainerConnected = compose(
  withConnect,
  withBootstapData()
)(OfferEditApplicationsContainer);
