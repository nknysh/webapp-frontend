import styled from 'styled-components';

const StyledFastSearchContainer = styled.div`
  display: grid;
  grid-template: 'sideBar searchResults';
  grid-template-columns: 0.25fr 0.75fr;
  grid-column-gap: 1rem;

  width: 100%;
  max-width: 1280px;
  margin: 2rem 1rem;

  .sideBar {
    grid-area: sideBar;
  }

  .searchResults {
    grid-area: searchResults;
  }

  .resultsGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 0.5rem;

    img {
      width: 300px;
    }
  }

  .searchResult {
  }
`;

export default StyledFastSearchContainer;
