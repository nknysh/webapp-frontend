import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export const OfferEditStyles = styled.main`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 10px;

  display: grid;
  grid-gap: 20px;
  grid-template-areas:
    'basicInfo'
    'preRequisites'
    'actions';

  .preRequisites {
    grid-area: preRequisites;
  }

  .actions {
    grid-area: actions;
    border-top: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
    padding-top: 50px;
    display: flex;
    justify-content: space-between;
  }

  .basicInfo {
    grid-area: basicInfo;
    margin-bottom: 100px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;
    min-width: 300px;
    grid-template-areas:
      'hotelName hotelName'
      'offerName offerName'
      'terms furtherInfo'
      'preDscountCheckbox textOnlyCheckbox'
      'preDiscountInfo textOnlyInfo';
  }

  .hotelName {
    grid-area: hotelName;
    & > select {
      width: 100%;
    }
  }
  .offerNameInput {
    grid-area: offerName;
  }
  .termsAndConditions {
    grid-area: terms;
  }
  .furtherInformation {
    grid-area: furtherInfo;
  }
  .textOnlyCheckbox {
    grid-area: textOnlyCheckbox;
  }
  .textOnlyInfo {
    grid-area: textOnlyInfo;
  }
  .preDiscount {
    grid-area: preDscountCheckbox;
  }
  .preDiscountInfo {
    grid-area: preDiscountInfo;
  }
`;
