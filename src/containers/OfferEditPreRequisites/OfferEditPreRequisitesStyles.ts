import styled from 'styled-components';
import { Throggle } from 'pureUi/forms/Throggle';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export const OfferEditPreRequisitesStyles = styled.section`
  .nullableBooleans {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 80px;
    grid-row-gap: 10px;

    ${Throggle} {
      border-bottom: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
      padding-bottom: 10px;
    }
  }

  .stayLength {
    display: grid;
    grid-gap: 10px;
    grid-row-gap: 10px 20px;
    grid-template-columns: 200px 200px 100px auto;

    .stayLengthStrict {
      margin-top: 24px;
    }

    .stayLengthInfo {
      margin-top: 35px;
    }
  }

  .advanceGrid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-gap: 20px;
  }
`;
