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

const Info = Styled.View.extend`
  margin-top: 10px;
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Name = Styled.H6.extend`
  color: ${colors.gold10};
`;

const Price = Styled.H6.extend`
`;

const Sleeps = Styled.H8.extend`
  color: ${colors.gold10};
`;

const CoverPhoto = Styled.View.extend`
  margin-vertical: 10px;
  height: 100px;
  width: 150px;
  background-color: ${colors.gray14};
`;

const RoomInfo = ({ room }) => (
  <Container>
    <Line />
    <Info>
      <Row style={{ justifyContent: 'space-between' }}>
        <Name>{room.name}</Name>
        <Price>{`$${room.barRate}`}</Price>
      </Row>
      <Sleeps>{`SLEEPS ${room.numGuests || 0}`}</Sleeps>
    </Info>
    <CoverPhoto />
  </Container>
);

export default RoomInfo;
