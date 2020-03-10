import styled from 'styled-components';

export const OfferEditStyles = styled.main`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 10px;

  .basicInfo {
    margin-bottom: 100px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 300px 1fr;
    grid-template-areas:
      'hotelSelect offerName'
      'terms terms'
      'textOnlyCheckbox furtherInfo'
      'textOnlyInfo furtherInfo'
      'preDscountCheckbox furtherInfo'
      'preDiscountInfo furtherInfo';
  }

  .hotelSelect {
    grid-area: hotelSelect;
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
