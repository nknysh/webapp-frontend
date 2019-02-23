// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// App
import { colors } from 'styles';
import { createBooking } from 'store/modules/bookings/actions';
import { deleteProposalRoom as releaseRoom } from 'store/modules/proposals/actions';

// Components
import { Styled } from 'components';
import RoomInfo from './RoomInfo';
import Brochures from './Brochures';

const Container = Styled.View.extend`
  background-color: ${colors.gray14};
`;

const HotelDetails = Styled.View.extend`
  position: absolute; 
  margin-left: 50px;
`;

const HoldDetails = Styled.View.extend`
  width: 100%;
  align-items: flex-end;
`;

const Row = Styled.View.extend`
  flex-direction: row;
  margin: 20px;
`;

const Name = Styled.H6.extend`
  color: ${colors.gold10};
`;

const Address = Styled.H6.extend`
  color: ${colors.gray11};
`;

const HoldText = Styled.H7.extend`
  color: ${colors.gray11};
`;

const HoldTimer = Styled.H7.extend`
  color: ${colors.gray11};
`;

const ResortLink = Styled.H7.extend`
  color: ${colors.gold10};
`;

const CoverPhoto = Styled.View.extend`
  height: 40px;
  width: 40px;
  background-color: ${colors.gray11};
  position: absolute;
  display: block;
`;

const HotelInfo = ({ hotel, handleChange, handleBlur, createBooking, releaseRoom }) => (
  <Container>
    <Row style={{ marginBottom: 0 }}>
      <CoverPhoto />
      <HotelDetails>
        <Name>MALDIVE SUPREME VILLAS</Name>
        <Address>1000 Street, Maldives 9382</Address>
      </HotelDetails>
      <HoldDetails>
        <HoldText>THIS ROOM HAS A HOLD</HoldText>
        <HoldTimer>EXPIRES IN 3 hours, 23 minutes</HoldTimer>
        <Link to={`/hotels`}>
          <ResortLink>+ VIEW RESORT</ResortLink>
        </Link>
      </HoldDetails>
    </Row>
    <Row style={{ marginTop: 0 }}>
      {/* TODO(james): need to connect brochures when BE is complete */}
      <Brochures />
    </Row>
    <RoomInfo createBooking={createBooking} releaseRoom={releaseRoom} />
  </Container>
);

export default connect(
  undefined,
  { createBooking, releaseRoom }
)(HotelInfo);
