import styled from 'styled-components';

const StyledFastSearchContainer = styled.div`
  display: grid;
  grid-template:
    'backButton heading'
    'sideBar searchResults';
  grid-template-columns: 345px auto;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;

  width: 90%;
  max-width: 1280px;
  margin: 2rem 5%;
  align-self: center;

  .sideBar {
    grid-area: sideBar;
  }

  .searchResults {
    grid-area: searchResults;
  }

  .resultsGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
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
  }

  input {
    text-transform: uppercase;
    font-size: 14px;
  }

  .searchButton {
    margin: 10px 0;
  }
`;

export default StyledFastSearchContainer;
