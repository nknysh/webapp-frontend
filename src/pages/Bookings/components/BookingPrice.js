// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
`;

const Line = Styled.View.extend`
  height: 1px;
  background-color: ${colors.gray14};
`;

const Row = Styled.View.extend`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-vertical: 20px;
`;

const RateLabel = Styled.H6.extend`
  color: ${colors.gold10};
`;

const Rate = Styled.H2.extend`
  color: ${colors.black3};
`;

const Notes = Styled.View.extend`
  margin-top: 20px;
`;

const Note = Styled.H8.extend`
  color: ${colors.black3};
`;

const BookingPrice = ({ booking }) => (
  <Container>
    <Line />
    <Row>
      <RateLabel>TOTAL NET COST TO YOU</RateLabel>
      <Rate>{'$8,265.00'}</Rate>
    </Row>
    <Notes>
      <Note>INCLUDES ALL APPLICABLE TAXES</Note>
      <Note>{`YOU SAVE $0,000.00 COMPARED TO BOOKING DIRECTLY W/ THIS PROPERTY`}</Note>
    </Notes>
  </Container>
);

export default BookingPrice;
