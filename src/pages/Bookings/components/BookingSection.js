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
  align-items: center;
  justify-content: space-between;
  margin-vertical: 5px;
`;

const Left = Styled.View.extend`
  flex-direction: row;
`;

const Name = Styled.H8.extend`
  font-weight: 500;
  color: ${colors.black3};
`;

const Value = Styled.H8.extend`
  color: ${colors.black3};
`;

const Price = Styled.H8.extend`
  color: ${colors.black3};
`;

const BookingSection = ({ name, value, price }) => (
  <Container>
    <Line />
    <Row>
      <Left>
        <Name>{`${name}:`}</Name>
        <Value>{value}</Value>
      </Left>
      <Price>{price}</Price>
    </Row>
  </Container>
);

export default BookingSection;
