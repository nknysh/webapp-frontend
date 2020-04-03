import styled from 'styled-components';

export const OfferEditOrderingStyles = styled.section`
  .contentGrid {
    display: grid;
    grid-template-columns: 1fr;
    
    grid-template-areas:
      'ordering';

    .ordering {
      grid-area: ordering;
    }

  }
`;
