import React, { Children } from 'react';

import { mapWithIndex } from 'utils';

import { propTypes, defaultProps } from './Summary.props';
import {
  StyledSummary,
  Title,
  Products,
  Details,
  Product as BaseProduct,
  Totals as BaseTotals,
  Total as BaseTotal,
  Offer as BaseOffer,
} from './Summary.styles';

const Product = ({ children, ...props }) => <BaseProduct {...props}>{children}</BaseProduct>;
const Totals = ({ children, ...props }) => <BaseTotals {...props}>{children}</BaseTotals>;
const Total = ({ children, ...props }) => <BaseTotal {...props}>{children}</BaseTotal>;
const Offer = ({ children, ...props }) => <BaseOffer {...props}>{children}</BaseOffer>;

const renderSummary = (child, i) => <Details key={i}>{child}</Details>;

export const Summary = ({ title, children, actions, ...props }) => {
  const childrenArr = Children.toArray(children);

  return (
    <StyledSummary {...props}>
      {title && <Title>{title}</Title>}
      <Products>{mapWithIndex(renderSummary, childrenArr)}</Products>
      {actions}
    </StyledSummary>
  );
};

Summary.propTypes = propTypes;
Summary.defaultProps = defaultProps;

Summary.Product = Product;
Summary.Totals = Totals;
Summary.Total = Total;
Summary.Offer = Offer;

export default Summary;
