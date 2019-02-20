// Libraries
import React from 'react';

// App
import { colors } from 'styles';
import { getRooms } from 'selectors/rooms';

// Components
import { Connect, Styled } from 'components';
import RoomCard from './RoomCard';

const Container = Styled.View.extend`
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const CoverPhoto = Styled.Image.extend`
  height: 500px;
  background-color: ${colors.gray14};
`;

const Photos = Styled.View.extend`
  flex-direction: row;
  margin-top: 30px;
`;

const Photo = Styled.View.extend`
  flex: 1;
  margin-right: ${props => props.isLast ? 0 : 20}px;
  height: 80px;
  background-color: ${colors.gray14};
`;

const Name = Styled.H4.extend`
  flex: 2;
  margin-right: 10px;
  margin-bottom: 30px;
  color: ${colors.gold10};
`;

const Overview = Styled.H7.extend`
  flex: 2;
  padding-vertical: 10px;
  margin-right: 10px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${colors.gray15};
`;

const Highlights = Styled.View.extend`
  flex: 1;
  padding-vertical: 10px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${colors.gray15};
`;

const Highlight = Styled.H7.extend`
`;

const Option = Styled.H6.extend`
`;

const Rooms = Styled.View.extend`
`;

const HotelDetails = ({ hotel }) => (
  <Container>
    <CoverPhoto
      source={{
        uri: hotel.featuredPhotoUrl,
        height: 500,
      }}
    />
    <Photos>
      <Photo />
      <Photo />
      <Photo />
      <Photo />
      <Photo isLast />
    </Photos>
    <Row style={{ marginTop: 40, marginBottom: 20 }}>
      <Name>{hotel.name}</Name>
    </Row>
    <Row style={{ marginVertical: 5 }}>
      <Overview>{hotel.overview}</Overview>
      <Highlights>
        {hotel.highlights && hotel.highlights.map((highlight, index) => (
          <Highlight key={index}>
            {highlight}
          </Highlight>
        ))}
      </Highlights>
    </Row>
    <Row style={{ marginTop: 50, marginBottom: 30 }}>
      <Option>SELECT AVAILABLE ACCOMODATION</Option>
    </Row>
    <Connect getState={(state) => ({ rooms: getRooms(state, { ids: hotel.rooms }) })}>
      {({ rooms }) => (
        <Rooms>
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
            />
          ))}
        </Rooms>
      )}
    </Connect>
  </Container>
);

export default HotelDetails;
