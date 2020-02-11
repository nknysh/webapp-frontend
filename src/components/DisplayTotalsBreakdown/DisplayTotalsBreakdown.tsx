import React from 'react';
import { formatPrice } from 'utils';
import styled from 'styled-components';

import { Price, TotalSection, TotalSectionColumn, LabelRed } from './DisplayTotalsBreakdown.styles';

import { TableCardBox, TableCardRow } from 'pureUi/TableCard';

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
  overrideTotal?: string;
}

export const DisplayTotalsBreakdown = (props: IDisplayTotalsBreakdownProps) => {
  const { t, currencyCode, overrideTotal } = props;
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

  const renderItemTitle = (block, item, itemIndex) => {
    if (block.blockType === 'Accommodations' || block.blockType === 'Transfers') {
      if (itemIndex === 0) {
        return null;
      }
    }

    const depth = block.blockType === 'Ground Services' || block.blockType === 'Addons' ? 3 : 2;
    const title =
      block.blockType === 'Ground Services' || block.blockType === 'Addons' ? (
        <span>{item.title}</span>
      ) : (
        <strong>{item.title}</strong>
      );

    return (
      <TableCardRow className="table-card-row" depth={depth} key={item.title}>
        <TotalSection>
          <TotalSectionColumn isLeft={true}>
            <label className="item-title">{title}</label>
          </TotalSectionColumn>
          <TotalSectionColumn>
            <PriceBreakdown total={item.total} totalBeforeDiscount={item.totalBeforeDiscount} />
          </TotalSectionColumn>
        </TotalSection>
      </TableCardRow>
    );
  };

  const blocksMarkup = displayTotals.blocks.map((block: IBlock) => {
    if (block.items.length <= 0) {
      return null;
    }

    const firstItem = block.items[0];

    const itemsBlocks = block.items.map((item: IItem, index: number) => {
      return (
        <React.Fragment>
          {renderItemTitle(block, item, index)}
          {item.labels.length >= 1 && (
            <TableCardRow className="table-card-row" depth={3}>
              {item.labels.map(l => {
                return (
                  <span style={{ display: 'block' }} key={l}>
                    <label className="item-label">{l}</label>
                  </span>
                );
              })}
              <LabelRed>{item.offers.join(', ')}</LabelRed>
            </TableCardRow>
          )}
        </React.Fragment>
      );
    });

    let blockHeader: any;

    if (block.blockType === 'Accommodations') {
      blockHeader = (
        <label className="item-title">
          {block.header}
          <br />
          {firstItem.title}
        </label>
      );
    } else if (block.blockType === 'Transfers') {
      blockHeader = (
        <label className="item-title">
          {block.header} ({firstItem.title})
        </label>
      );
    } else {
      blockHeader = <label className="item-title">{block.header}</label>;
    }

    return (
      <TableCardBox className="table-card-box mb-4" key={block.header}>
        <TableCardRow depth={2}>
          <TotalSection>
            <TotalSectionColumn isLeft={true}>
              <strong>{blockHeader}</strong>
            </TotalSectionColumn>

            {(block.blockType === 'Accommodations' || block.blockType === 'Transfers') && (
              <TotalSectionColumn>
                <PriceBreakdown
                  total={firstItem.total}
                  totalBeforeDiscount={firstItem.totalBeforeDiscount}
                  oneOrMoreItemsOnRequest={firstItem.isOnRequestOrPartiallyOnRequest}
                />
              </TotalSectionColumn>
            )}
          </TotalSection>
        </TableCardRow>

        {itemsBlocks}
      </TableCardBox>
    );
  });

  return (
    <div className={props.className}>
      {blocksMarkup}

      <TableCardBox>
        <TableCardRow className="table-card-row" depth={2} hasLeftBorder={true}>
          <TotalSection>
            <TotalSectionColumn isLeft={true}>
              <label>Total Cost To You</label>
              <br />
              <label>Total Cost Before Offers</label>
            </TotalSectionColumn>

            <TotalSectionColumn>
              <PriceBreakdown
                total={overrideTotal || displayTotals.totals.total}
                totalBeforeDiscount={displayTotals.totals.totalBeforeDiscount}
                oneOrMoreItemsOnRequest={displayTotals.totals.oneOrMoreItemsOnRequest}
              />
            </TotalSectionColumn>
          </TotalSection>
        </TableCardRow>
      </TableCardBox>
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
