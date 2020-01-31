import styled from 'styled-components';
import { pureUiTheme } from '../pureUiTheme';

export const BookingGuestInformationFormStyles = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'title title'
    'firstName firstName'
    'lastName lastName'
    'repeatGuest repeatGuest'
    'flightInfoLabel flightInfoLabel'
    'arrivalNumber arrivalDate'
    'departureNumber departureDate'
    'specialRequests specialRequests'
    'comments comments';

  .title {
    grid-area: title;
  }

  .firstName {
    grid-area: firstName;
  }

  .lastName {
    grid-area: lastName;
  }

  .repeatGuest {
    grid-area: repeatGuest;
  }

  .flightInfoLabel {
    grid-area: flightInfoLabel;
    border-bottom: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
    padding-bottom: 10px;
  }

  .arrivalNumber {
    grid-area: arrivalNumber;
  }

  .departureNumber {
    grid-area: departureNumber;
  }

  .departureDates {
    grid-area: departureDates;
  }

  .specialRequests {
    grid-area: specialRequests;
  }

  .comments {
    grid-area: comments;
    border-top: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
    padding-top: 10px;
  }

  .twoColumn {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5px;
  }
`;
