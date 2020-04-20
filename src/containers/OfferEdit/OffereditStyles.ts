import styled, { keyframes } from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import { Throggle } from 'pureUi/forms/Throggle/index';

export const OfferEditStyles = styled.main`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 10px;

  display: grid;
  grid-gap: 20px;
  grid-template-areas:
    'basicInfo'
    'tabBar'
    'routes'
    'actions'
    'offerStatus';

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

  .tabBar {
    grid-area: tabBar;
    position: sticky;
    top: 0;
    background-color: ${pureUiTheme.colors.white};
    z-index: 1; /* Z-Index is on purpose. Grids and position sticky mess around with the z-index, so need controlling*/
  }

  .routes {
    grid-area: routes;
  }

  .basicInfo {
    grid-area: basicInfo;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;
    min-width: 300px;
    grid-template-areas:
      'hotelName hotelName'
      'hotelErrors hotelErrors'
      'offerName offerName'
      'offerNameErrors offerNameErrors'
      'terms furtherInfo'
      'termsErrors furtherInformationErrors'
      'preDscountCheckbox textOnlyCheckbox'
      'preDiscountInfo textOnlyInfo';
  }

  fieldset {
    margin-bottom: 50px;
  }

  .offerError {
    grid-area: offerStatus;
    border: red 1px solid;
    background-color: rgba(255, 0, 0, 0.25);
    color: red;
    padding: 10px;
    text-align: center;
  }

  .offerConfirmation {
    grid-area: offerStatus;
    border: ${pureUiTheme.colors.marine} 1px solid;
    background-color: ${pureUiTheme.colors.lightBlue};
    color: ${pureUiTheme.colors.marine};
    padding: 10px;
    text-align: center;
  }

  .error {
    color: red;
  }

  .hotelName {
    grid-area: hotelName;
    & > select {
      width: 100%;
    }
  }
  .hotelErrors {
    grid-area: hotelErrors;
  }
  .offerName {
    grid-area: offerName;
  }
  .offerNameErrors {
    grid-area: offerNameErrors;
  }
  .termsAndConditions {
    grid-area: terms;
  }
  .termsAndConditionsErrors {
    grid-area: termsErrors;
  }
  .furtherInformationErrors {
    grid-area: furtherInformationErrors;
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
