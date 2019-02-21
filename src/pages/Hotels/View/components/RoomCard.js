// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
  flex-direction: row;
  margin-bottom: 30px;
`;

const CoverPhoto = Styled.Image.extend`
  height: 300px;
  width: 360px;
  background-color: ${colors.gray14};
`;

const Details = Styled.View.extend`
  flex: 1;
  padding: 30px;
  background-color: ${colors.gray15};
`;

const Info = Styled.View.extend`
  flex: 1;
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Name = Styled.H5.extend`
  color: ${colors.gold10};
`;

const Price = Styled.H6.extend`
`;

const Discount = Styled.H7.extend`
  margin-top: 25px;
  font-size: 13px;
`;

const Items = Styled.View.extend`
  margin-vertical: 15px;
`;

const Item = Styled.H8.extend`
`;

const Upgrade = Styled.H8.extend`
`;

const Actions = Styled.View.extend`
  flex-direction: row;
`;

const Action = Styled.H8.extend`
  color: ${colors.gold10};
`;

const RoomCard = ({ room }) => (
  <Container>
    <CoverPhoto
      source={{
        uri: room.photoUrl,
        height: 300,
        width: 360,
      }}
    />
    <Details>
      <Info>
        <Row style={{ justifyContent: 'space-between' }}>
          <Name>{room.name}</Name>
          <Price>{`$${room.barRate}`}</Price>
        </Row>
        <Discount>STAY FOR 7 NIGHTS, PAY ONLY FOR 6 WITH COMPLIMENTARY UPGRADE</Discount>
        <Items>
          <Item>2 BEDROOMS</Item>
          <Item>250 SQ M OF INTERIOR SPACE</Item>
          <Item>SLEEPS UP TO 4 ADULTS; OR 2 ADULTS AND 2 CHILDREN</Item>
          <Item>PRIVATE POOL</Item>
        </Items>
        <Upgrade>UPGRADE TO A SUNSET POOL VILLA FOR $2500 PER PERSON</Upgrade>
      </Info>
      <Actions>
        <Action>MORE DETAILS</Action>
        <Action style={{ marginLeft: 10 }}>VIEW FLOORPLANS</Action>
      </Actions>
    </Details>
  </Container>
);

export default RoomCard;
