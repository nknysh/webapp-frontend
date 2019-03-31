import React from 'react';
import { path } from 'ramda';

import uiConfig from 'config/ui';

import { propTypes, defaultProps } from './SummaryForm.props';
import { StyledSummary, Title, Section, Total, Text, Saving, HotelName } from './SummaryForm.styles';

export const SummaryForm = ({ name, total, saving, className, rooms }) => {
  return (
    <StyledSummary className={className}>
      <Title>{path(['labels', 'totalNet'], uiConfig)}</Title>
      <Section>
        <Total>{total}</Total>
        <Text>{path(['labels', 'includesTaxes'], uiConfig)}</Text>
        <Text>
          {path(['labels', 'savingOfPrefix'], uiConfig)}
          <Saving>{saving}</Saving>
          {path(['labels', 'savingOfSuffix'], uiConfig)}
        </Text>
      </Section>
      {name && <HotelName>{name}</HotelName>}
      <Title>{path(['labels', 'returnTransfers'], uiConfig)}</Title>
      <Title>{path(['labels', 'groundService'], uiConfig)}</Title>
      <Title>{path(['labels', 'addOns'], uiConfig)}</Title>
      <Title>{path(['labels', 'addCommission'], uiConfig)}</Title>
    </StyledSummary>
  );
};

SummaryForm.propTypes = propTypes;
SummaryForm.defaultProps = defaultProps;

export default SummaryForm;
