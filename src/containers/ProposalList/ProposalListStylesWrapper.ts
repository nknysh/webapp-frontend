import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export const ProposalListStylesWrapper = styled.section`
  width: 90%;
  max-width: 1280px;
  margin: 2rem 5%;
  align-self: center;

  display: grid;
  grid-template-columns: 1fr auto 0.5fr;
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

  .settings .filterInput {
    flex-grow: 1;
    margin-right: 10px;
    height: 38px;
    margin-top: 6px; /* Can't remove the syupid margin on material UI's select, so have to match the margin here. */
  }

  .table {
    grid-area: table;
  }

  .pagination {
    grid-area: pagination;
    margin: 20px auto;
  }

  .table .id {
    width: 13%;
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
