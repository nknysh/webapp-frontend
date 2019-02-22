// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
  background-color: ${colors.gray16};
  flex: 1;
`;

const Content = Styled.View.extend`
  padding-left: 40px;
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Line = Styled.View.extend`
  height: 1px;
  background-color: ${colors.gray14};
  margin: 8px 0 8px 0;
`;

const Text = Styled.H7.extend`
`;

const OptionText = Styled.H7.extend`
  color: ${colors.gold10};
`;

const Price = Styled.H7.extend`
  color: ${colors.gold10};
  flex: 1;
  text-align: right;
`;

const TotalCostText = Styled.H8.extend`
  color: ${colors.gray11};
  padding-right: 15px;
  text-align-vertical: bottom;
  line-height: 30px;
`;

const TotalCostPrice = Styled.H5.extend`
  color: ${colors.gold10};
`;

const MarginDisclaimer = Styled.H8.extend`
  color: ${colors.gold10};
`;

const Button = Styled.Button.extend`
  width: 180px;
  background-color: ${colors.gray11}; 
  margin-left: 12px;
  border-color: ${colors.gray11};
`;

const ButtonText = Styled.H8.extend`
  color: ${colors.white16};  
`;

const RoomInfo = ({ room, releaseRoom, createBooking }) => (
  <Container>
    <Content>
      <Line />
      <Row>
        <Text>10 NIGHTS @ $865/NIGHT</Text>
        <Price>$7,432.52</Price>
      </Row>
      <Line />
      <Row>
        <Text>MEAL PLAN: </Text>
        <OptionText>BREAKFAST</OptionText>
        <Price>$0</Price>
      </Row>
      <Line />
      <Row>
        <Text>RETURN TRANSFER: </Text>
        <OptionText>SPEEBOAT</OptionText>
        <Price>$0</Price>
      </Row>
      <Line />
      <Row>
        <Text>GROUND SERVICE: </Text>
        <OptionText>AIRPORT MEETING</OptionText>
        <Price>$0</Price>
      </Row>
      <Line />
      <Row>
        <Text>ADDONS: </Text>
        <OptionText>NONE</OptionText>
        <Price>$0</Price>
      </Row>
      <Line />
      <Row style={{ flexDirection: 'column' }}>
        <Row style={{ padding: 0 }}>
          <Text>YOUR MARGIN: </Text>
          <OptionText>10%</OptionText>
          <Price>$827.22</Price>
        </Row>
        <Row style={{ padding: 0 }}>
          <MarginDisclaimer>Client will only see this price included as part of the nightly rate</MarginDisclaimer>
        </Row>
      </Row>
      <Line />
    </Content>
    <Row style={{ alignSelf: 'flex-end' }}>
      <TotalCostText>TOTAL COST</TotalCostText>
      <TotalCostPrice>$8,230</TotalCostPrice>
    </Row>
    <Row style={{ alignSelf: 'flex-end' }}>
      <Button
        onPress={() => {
          releaseRoom();
        }}
      >
        <ButtonText>RELEASE</ButtonText>
      </Button>
      <Button
        onPress={() => {
          createBooking();
        }}
      >
        <ButtonText>BOOK NOW</ButtonText>
      </Button>
    </Row>
  </Container>
);

export default RoomInfo;
