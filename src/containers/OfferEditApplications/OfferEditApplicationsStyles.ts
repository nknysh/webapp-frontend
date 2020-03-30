import styled from 'styled-components';
import { Throggle } from 'pureUi/forms/Throggle';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export const OfferEditApplicationsStyles = styled.section`
  .greenTaxGrid {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-row-gap: 0;
    grid-column-gap: 20px;
    grid-template-areas:
      'input select'
      '. info';

    .input {
      grid-area: input;
    }
    .select {
      grid-area: select;
    }
    .info {
      grid-area: info;
    }
  }
`;
