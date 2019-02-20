// Libraries
import React from 'react';
import _ from 'lodash';

// App
import { colors } from 'styles';
import { getHotel } from 'selectors/hotels';
import { getRooms } from 'selectors/rooms';

// Components
import { Connect, Styled } from 'components';
import BookingSection from './BookingSection';
import BookingPrice from './BookingPrice';
import RoomInfo from './RoomInfo';

const Container = Styled.View.extend`
  width: 450px;
  margin-left: 30px;
`;

const Content = Styled.View.extend`
`;

const Sections = Styled.View.extend`
  padding-vertical: 30px;
  padding-horizontal: 20px;
  background-color: ${colors.gray16};
`;

const Name = Styled.H4.extend`
  margin-top: 20px;
  color: ${colors.gold10};
`;

const Rooms = Styled.View.extend`
`;

const BookingSidebar = ({ booking, children }) => (
  <Container>
    <Connect getState={(state) => ({ hotel: getHotel(state, booking.hotelId) })}>
      {({ hotel }) => (
        <Content>
          <Sections>
            <Name>{hotel.name}</Name>
            <Connect getState={(state) => ({ rooms: _.take(getRooms(state, { ids: hotel.rooms }), 2) })}>
              {({ rooms }) => (
                <Rooms>
                  {rooms.map((room) => (
                    <RoomInfo
                      key={room.id}
                      room={room}
                    />
                  ))}
                </Rooms>
              )}
            </Connect>
            <BookingSection
              name="DATES"
              value=""
            />
            <BookingSection
              name="MEAL PLAN"
              value={booking.mealPlan}
              price="INC. IN PRICE"
            />
            <BookingSection
              name="RETURN TRANSFER"
              value={booking.returnTransfer}
              price="INC. IN PRICE"
            />
            <BookingSection
              name="GROUND SERVICE"
              value={booking.groundService}
              price="INC. IN PRICE"
            />
            <BookingSection
              name="YOUR MARGIN"
              value={`${booking.taMarginAmount}%`}
              price="$865.00"
            />
            <BookingPrice
              booking={booking}
            />
          </Sections>
        </Content>
      )}
    </Connect>
    {children}
  </Container>
);

export default BookingSidebar;
