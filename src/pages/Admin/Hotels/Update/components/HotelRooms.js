// Libraries
import React from 'react';
import { withRouter } from 'react-router-dom';

// App
import { getRooms } from 'selectors/rooms';

// Components
import { Connect, Styled } from 'components';
import { SectionHeader } from 'pages/Admin/components';
import { RoomUpdateForm } from 'pages/Admin/Rooms/Update/components';

const Container = Styled.View.extend`
`;

const Rooms = Styled.View.extend`
`;

const HotelRooms = ({ history, hotel }) => (
  <Container>
    <SectionHeader
      title="ROOMS"
      action="ADD NEW ROOM"
      onPress={() => history.push(`/admin/hotels/${hotel.id}/rooms/new`)}
    />
    <Connect getState={(state) => ({ rooms: getRooms(state, { ids: hotel.rooms }) })}>
      {({ rooms }) => (
        <Rooms>
          {rooms.map((room) => (
            <RoomUpdateForm
              key={room.id}
              room={room}
            />
          ))}
        </Rooms>
      )}
    </Connect>
  </Container>
);

export default withRouter(HotelRooms);
