import React from 'react';
import { formatPrice } from 'utils';
import styled from 'styled-components';

import {
  Price,
  TotalSection,
  TotalSectionColumn,
  LabelRed,
} from '../AggregateTotalsBreakdown/AggregateTotalsBreakdown.styles';

interface IItem {
  title: string;
  labels: string[];
  isOnRequestOrPartiallyOnRequest: boolean;
  total: string;
  totalBeforeDiscount: string;
  offers: object[] | string[];
}
interface IBlock {
  header: string;
  items: IItem[];
  blockType: string;
}

interface IDisplayTotals {
  blocks: IBlock[];
  appliedOfferNames: string[];
  totals: {
    oneOrMoreItemsOnRequest: boolean;
    totalForPricedItemsCents: number;
    totalBeforeDiscountForPricedItemsCents: number;
    totalForPricedItems: string;
    totalBeforeDiscountForPricedItems: string;
    total: string;
    totalBeforeDiscount: string;
  };
}

export interface IDisplayTotalsBreakdownProps {
  t: (key: string) => string;
  className?: string;
  currencyCode: string;
  displayTotals: IDisplayTotals;
}

export const DisplayTotalsBreakdown = (props: IDisplayTotalsBreakdownProps) => {
  const { t, currencyCode } = props;
  const displayTotals: IDisplayTotals = props.displayTotals;

  const PriceBreakdown = props => {
    const { total, totalBeforeDiscount, oneOrMoreItemsOnRequest } = props;

    if (oneOrMoreItemsOnRequest === true) {
      return <label>{t ? t('labels.priceAvailableOnRequest') : 'Price available on request'}</label>;
    }

    if (!total && !totalBeforeDiscount) {
      return <label>{t ? t('labels.itemNoTotal') : 'Item No Total'}</label>;
    }

    if (totalBeforeDiscount && total !== totalBeforeDiscount) {
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

  const blocksMarkup = displayTotals.blocks.map((block: IBlock) => {
    if (block.items.length <= 0) {
      return null;
    }

    const itemsBlocks = block.items.map((item: IItem) => {
      return (
        <React.Fragment key={item.title}>
          <TotalSection>
            <TotalSectionColumn isLeft={true}>
              <label>
                <strong>{item.title}</strong>
              </label>
              <ul>
                {item.labels.map(l => {
                  return (
                    <li key={l}>
                      <label>{l}</label>
                    </li>
                  );
                })}
              </ul>
              <LabelRed>{item.offers.join(', ')}</LabelRed>
            </TotalSectionColumn>
            <TotalSectionColumn>
              <PriceBreakdown total={item.total} totalBeforeDiscount={item.totalBeforeDiscount} />
            </TotalSectionColumn>
          </TotalSection>
        </React.Fragment>
      );
    });

    return (
      <React.Fragment key={block.header}>
        <div>
          <label>
            <strong>{block.header}</strong>
          </label>

          {itemsBlocks}
        </div>
      </React.Fragment>
    );
  });

  return (
    <div className={props.className}>
      {blocksMarkup}

      <TotalSection>
        <TotalSectionColumn isLeft={true}>
          <label>Total Cost To You</label>
          <br />
          <label>Total Cost Before Offers</label>
        </TotalSectionColumn>

        <TotalSectionColumn>
          <PriceBreakdown
            total={displayTotals.totals.total}
            totalBeforeDiscount={displayTotals.totals.totalBeforeDiscount}
            oneOrMoreItemsOnRequest={displayTotals.totals.oneOrMoreItemsOnRequest}
          />
        </TotalSectionColumn>
      </TotalSection>
    </div>
  );
};

export default styled(DisplayTotalsBreakdown)`
  text-transform: uppercase;
  color: #736a65;
  font-size: 13px;
  span {
    font-size: 13px;
  }
`;
