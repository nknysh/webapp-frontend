import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';

const StyledFastSearchContainer = styled.div`
  display: grid;
  grid-template:
    'backButton heading'
    'sideBar searchResults';
  grid-template-columns: 0.25fr auto;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;

  width: 90%;
  max-width: 1280px;
  margin: 2rem 5%;
  align-self: center;

  .sideBar {
    grid-area: sideBar;
    min-width: 300px;
    min-width: 315px;
  }

  .searchResults {
    grid-area: searchResults;
  }

  .heading {
    grid-area: heading;
    display: flex;
    align-items: center;
  }

  .backButton {
    grid-area: backButton;
    display: flex;
    align-items: center;
    color: ${pureUiTheme.colors.gold};
    font-weight: 600;
    text-transform: uppercase;
    font-size: 12px;

    .backIcon {
      background-color: ${pureUiTheme.colors.grayDark};
      font-size: 16px;
      margin-right: 10px;
    }
  }

  input {
    text-transform: uppercase;
    font-size: 14px;
  }

  .searchButton {
    margin: 10px 0;
    width: 100%;
  }

  .basicSearchLabel {
    text-transform: uppercase;
    font-size: 12px;
    display: block;
    margin-bottom: 1.5rem;
    color: ${pureUiTheme.colorRoles.grayLabel};

    & > span {
      display: block;
      margin-bottom: 10px;
    }
  }

  .repeatGuest {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
    margin: 0;

    .label {
      margin-left: 10px;
    }
  }
`;

export default StyledFastSearchContainer;
