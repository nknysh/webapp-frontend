import styled from 'styled-components';
import { pureUiTheme } from '../pureUiTheme';

export const BookingGuestInformationFormStyles = styled.div`
  display: flex;
  flex-direction: column;
  
  > * {
    margin-bottom: 10px;
  }

  .flightInfo {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
    'flightInfoLabel flightInfoLabel'
    'arrivalNumber arrivalDate'
    'departureNumber departureDate'
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

  .comments {
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
