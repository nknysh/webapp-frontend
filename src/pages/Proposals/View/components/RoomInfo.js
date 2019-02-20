// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';
import RoomEdit from './RoomEdit';

const Container = Styled.View.extend`
  background-color: ${colors.gray16};
  padding: 22px;
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Name = Styled.H6.extend`
  color: ${colors.black3};
`;

const RemoveRoom = Styled.Button.extend`
  background-color: none;
  border-width: 0;
  padding: 0;
  margin: 0;
  width: auto;
  height: auto;
`;

const RemoveRoomText = Styled.H8.extend`
  color: ${colors.gold10};
`;

const CoverPhoto = Styled.View.extend`
  height: 250px;
  width: 350px;
  background-color: ${colors.gray14};
`;

const RoomInfo = ({ room, releaseRoom, createBooking }) => (
  <Container>
    <Row style={{ justifyContent: 'space-between' }}>
      <Name>Room Name</Name>
        <RemoveRoom onClick={() => releaseRoom() }>
          <RemoveRoomText>REMOVE FROM PROPOSAL</RemoveRoomText>
        </RemoveRoom>        
    </Row>
    <Row style={{marginTop: 20}}>
      <CoverPhoto />
      <RoomEdit 
        releaseRoom={releaseRoom}
        createBooking={createBooking}
      />
    </Row>
  </Container>
);

export default RoomInfo;
