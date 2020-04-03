import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { OfferEditOrderingStyles } from './OfferEditOrderingStyles';

import { orderedOffersListSelector } from 'store/modules/offer/selectors';
import { setOrderedOffersListAction } from 'store/modules/offer/actions';

import { Fieldset, Legend } from '../../pureUi/forms/Fieldset/index';

export class OfferEditOrderingContainer extends React.Component<IOfferEditOrderingProps, {}> {
  
  
  render() {

    return (
      <OfferEditOrderingStyles>
        <Fieldset>
          <Legend>Order</Legend>
          <div className="contentGrid">
              <div className="ordering">TODO ordering list</div>
          </div>
        </Fieldset>
      </OfferEditOrderingStyles>
    );
  }
}

// -----------------------------------------------------------------------------
// Prop Typings
// -----------------------------------------------------------------------------
export type StateToProps = ReturnType<typeof mapStateToProps>;
export type DispatchToProps = typeof actionCreators;

export interface IOfferEditOrderingProps extends StateToProps, DispatchToProps {}

const mapStateToProps = createStructuredSelector({
  orderedOffersList: orderedOffersListSelector
});

const actionCreators = {
  setOrderedOffersListAction
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, IOfferEditOrderingProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const OfferEditOrderingContainerConnected = withConnect(OfferEditOrderingContainer);
