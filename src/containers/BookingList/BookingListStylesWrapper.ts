import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export const BookingListStylesWrapper = styled.section`
  width: 90%;
  max-width: 1280px;
  margin: 2rem 5%;
  align-self: center;

  display: grid;
  grid-template-columns: 1fr auto 1.5fr;
  grid-template-areas:
    'heading . settings'
    'table table table'
    'pagination pagination pagination';

  .heading {
    grid-area: heading;
  }

  .settings {
    grid-area: settings;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 50px;
  }

  .settings > label {
    margin-left: 10px;
    color: ${pureUiTheme.colors.black};
    font-size: 12px;
    flex-grow: 1;
  }

  .settings .filterInput {
    flex-grow: 1;
    margin-right: 10px;
    height: 35px;
  }

  .table {
    grid-area: table;
  }

  .pagination {
    grid-area: pagination;
    margin: 20px auto;
  }

  .table .id {
  }

  .table .client {
    width: 10%;
  }
  .table .created {
    width: 13%;
  }

  .table .bookingCount {
    width: 85px;
  }

  .table .hotelCount {
    width: 85px;
  }

  .table .comments {
    width: auto;
  }
  .table .actions {
    width: 13%;
  }

  .table .centered {
    text-align: center;
  }

  /* Todo: Make the TextInput responsible for styling icons */
  .searchIcon {
    height: 100%;
    color: ${pureUiTheme.colors.goldLight};
    margin-right: 10px;
  }
`;
