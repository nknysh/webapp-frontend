import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export const ProposalListStylesWrapper = styled.section`
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
    justify-content: flex-end;
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
  .table .created,
  .table .updated {
    width: 100px;
  }

  .table .bookingCount,
  .table .hotelCount {
    width: 79px;
  }

  .isSent {
    width: 60px;
  }

  .table .actions {
    width: 13%;
    text-indent: -99999px;
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
