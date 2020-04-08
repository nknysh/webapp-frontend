import React from 'react';
import styled from 'styled-components';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import { OfferEditOrderingStyles } from './OfferEditOrderingStyles';

import {
  orderedOffersListSelector,
  offerHotelUuidSelector
} from 'store/modules/offer/selectors';

import { setOrderedOffersListAction } from 'store/modules/offer/actions';
import { OrderedOffer } from 'store/modules/offer/model';

import { Fieldset, Legend } from 'pureUi/forms/Fieldset';
import { Text } from 'pureUi/typography';
import SortableList from 'pureUi/SortableList';


const StyledItem = styled('div')`
  font-size: 12px;
  padding: 15px
  color: ${pureUiTheme.colorRoles.grayLabel};

  &.selected {
    font-weight: bold;
    background-color: ${pureUiTheme.colors.grayLight};
  }
`;

export class OfferEditOrderingContainer extends React.Component<IOfferEditOrderingProps, {}> {
  
  keySelector(item: OrderedOffer): string {
    return item.uuid;
  }

  renderItem = (item: OrderedOffer, index: number) => {
    return (
      <StyledItem className={item.selected ? 'selected' : ''}>
        { `${index + 1}. ${item.name}`}
      </StyledItem>
    );
  }; 

  render() {
    const {
      orderedOffersList,
      setOrderedOffersListAction,
      hotelUuid
    } = this.props;
    
    return (
      <OfferEditOrderingStyles>
        <Fieldset>
          <Legend>Order</Legend>
          {hotelUuid
            ? (
              <div className="contentGrid">
                <div className="ordering">
                  <SortableList<OrderedOffer>
                    items={orderedOffersList}
                    keySelector={this.keySelector}
                    renderItem={this.renderItem}
                    onChange={setOrderedOffersListAction}
                  />
                </div>
              </div>
            )
            : (
              <Text>Select a hotel to start prioritizing offers</Text>
            )
          }
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
  orderedOffersList: orderedOffersListSelector,
  hotelUuid: offerHotelUuidSelector
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
