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
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr 300px;
    grid-template-areas:
      'stayLengthMin stayLengthMax stayLengthStrict'
      'stayLengthMinInfo stayLengthMaxInfo stayLengthInfo';

    .stayLengthMin {
      grid-area: stayLengthMin;
    }

    .stayLengthMinInfo {
      grid-area: stayLengthMinInfo;
      margin: 0;
    }

    .stayLengthMax {
      grid-area: stayLengthMax;
    }

    .stayLengthMaxInfo {
      grid-area: stayLengthMaxInfo;
      margin: 0;
    }

    .stayLengthStrict {
      grid-area: stayLengthStrict;
      margin-top: 24px;
    }

    .stayLengthInfo {
      grid-area: stayLengthInfo;
      margin: 0;
    }
  }

  .advanceGrid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-gap: 20px;
  }

  .maxLodgingsFieldset > div {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 300px auto;
    align-items: end;
    p {
      margin: 0;
    }
  }

  .accommodationInfo:first-of-type {
    margin-top: 30px;
  }
`;
