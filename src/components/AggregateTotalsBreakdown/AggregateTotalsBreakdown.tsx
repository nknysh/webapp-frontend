import React, { useState } from 'react';

// @ts-ignore
import { isNilOrEmpty } from 'ramda-adjunct';

// @ts-ignore
import { Icon } from '@material-ui/core';

import { CollapseButton } from '../../containers/LodgingSummary/LodgingSummary.styles';

import {
  OfferSpan,
  TotalBreakdownSpan,
  Price,
  TotalSection,
  TotalSectionColumn,
} from './AggregateTotalsBreakdown.styles';

// @ts-ignore
import { formatPrice } from 'utils';

interface IAggregateTotal {
  title: string;
  quantity: number;
  oneOrMoreItemsOnRequest: boolean;
  totalForPricedItemsCents: number;
  totalBeforeDiscountForPricedItemsCents: number;
  totalForPricedItems: string;
  totalBeforeDiscountForPricedItems: string;
  total: string;
  totalBeforeDiscount: string;
  drilldown: IAggregateTotal[];
  offers: string[];
}

interface BaseAggregateTotals {
  Booking: IAggregateTotal;
  Accommodation: IAggregateTotal;
  'Meal Plan': IAggregateTotal;
  Supplement: IAggregateTotal;
  'Ground Service': IAggregateTotal;
  Transfer: IAggregateTotal;
  Fine: IAggregateTotal;
}

export const AggregateTotalsBreakdown = props => {
  const aggregateTotals: BaseAggregateTotals = props.aggregateTotals || {};
  const currencyCode: string = props.currencyCode || '';
  const translate: Function = props.t;

  const PriceBreakdown = props => {
    const { currencyCode, total, totalBeforeDiscount } = props;
    if (!total && !totalBeforeDiscount) {
      return <label>{translate('labels.itemNoTotal')}</label>;
    }
    if (props.totalBeforeDiscount) {
      return (
        <React.Fragment>
          <Price {...props} discount={true}>
            {currencyCode}
            {formatPrice(total)}
          </Price>
          <Price {...props} preDiscount={true}>
            {currencyCode}
            {formatPrice(totalBeforeDiscount)}
          </Price>
        </React.Fragment>
      );
    } else {
      return (
        <Price>
          {currencyCode}
          {formatPrice(total)}
        </Price>
      );
    }
  };

  const AggregateTotalSection = ({
    aggregateTotal,
    nestingLevel,
  }: {
    aggregateTotal: IAggregateTotal;
    nestingLevel: number;
  }) => {
    const drilldown = aggregateTotal.drilldown;
    const hasDrilldown = drilldown && drilldown.length >= 1;
    const [isCollapsed, setIsCollapsed] = useState(true);
    const offersBreakdown = aggregateTotal.offers.join(' & ');

    if (aggregateTotal.oneOrMoreItemsOnRequest) {
      return (
        <TotalSection>
          <TotalSectionColumn {...props} nestingLevel={nestingLevel} isLeft={true}>
            <TotalBreakdownSpan>{aggregateTotal.title}</TotalBreakdownSpan>
            <br />
            <label>{translate ? translate('labels.priceAvailableOnRequest') : 'Price available on request'}</label>
          </TotalSectionColumn>
        </TotalSection>
      );
    }

    return (
      <React.Fragment>
        <TotalSection>
          <TotalSectionColumn {...props} nestingLevel={nestingLevel} isLeft={true}>
            <TotalBreakdownSpan>{aggregateTotal.title}</TotalBreakdownSpan>
            <br />
            <PriceBreakdown
              currencyCode={currencyCode}
              total={aggregateTotal.total}
              totalBeforeDiscount={
                aggregateTotal.total != aggregateTotal.totalBeforeDiscount ? aggregateTotal.totalBeforeDiscount : null
              }
            />
          </TotalSectionColumn>

          <TotalSectionColumn>
            {hasDrilldown && (
              <CollapseButton type="button" onClick={() => setIsCollapsed(!isCollapsed)}>
                {isCollapsed ? <Icon>keyboard_arrow_down</Icon> : <Icon>keyboard_arrow_up</Icon>}
              </CollapseButton>
            )}
          </TotalSectionColumn>
        </TotalSection>

        {hasDrilldown &&
          !isCollapsed &&
          drilldown.map(nestedAggregateTotal => {
            return <AggregateTotalSection nestingLevel={nestingLevel + 1} aggregateTotal={nestedAggregateTotal} />;
          })}
      </React.Fragment>
    );
  };

  if (isNilOrEmpty(aggregateTotals)) {
    return null;
  }

  const totalSum = Object.keys(aggregateTotals).reduce((sum: number, total: string) => {
    const aggregateTotal: IAggregateTotal = aggregateTotals[total];
    sum += aggregateTotal.total ? parseFloat(aggregateTotal.total) : 0;
    return sum;
  }, 0);

  const totalBeforeDiscountSum = Object.keys(aggregateTotals).reduce((sum: number, total: string) => {
    const aggregateTotal: IAggregateTotal = aggregateTotals[total];
    sum += aggregateTotal.totalBeforeDiscount ? parseFloat(aggregateTotal.totalBeforeDiscount) : 0;
    return sum;
  }, 0);

  return (
    <React.Fragment>
      {Object.keys(aggregateTotals).map(atk => {
        return <AggregateTotalSection nestingLevel={0} aggregateTotal={aggregateTotals[atk]} />;
      })}
    </React.Fragment>
  );
};

export default AggregateTotalsBreakdown;
