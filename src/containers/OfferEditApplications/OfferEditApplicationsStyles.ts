import styled from 'styled-components';
import { Throggle } from 'pureUi/forms/Throggle';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export const OfferEditApplicationsStyles = styled.section`
  .accomodationDiscountGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 0;
    grid-column-gap: 20px;
    grid-template-areas:
      'input select select removeButton'
      '. info info .';

    .input {
      grid-area: input;
    }
    .select {
      grid-area: select;
    }
    .info {
      grid-area: info;
    }

    .removeButton {
      grid-area: removeButton;
      text-align: right;
    }
  }

  .steppingGrid {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      'nights apply max removeButton'
      'checkbox . . .';

    .nights {
      grid-area: nights;
    }
    .apply {
      grid-area: apply;
    }
    .max {
      grid-area: max;
    }
    .checkbox {
      grid-area: checkbox;
    }
    .removeButton {
      grid-area: removeButton;
      text-align: right;
    }
  }

  .extraPersonSupplement {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      'ageNames ageNames ageNames epsCloseButton'
      'discountInput maxQuantityInput epsGreentax .';

    & > .ageNames {
      grid-area: ageNames;
    }

    & > .discountInput {
      grid-area: discountInput;
    }
    & > .maxQuantityInput {
      grid-area: maxQuantityInput;
    }
    & > .epsCloseButton {
      grid-area: epsCloseButton;
      text-align: right;
    }

    & > .epsGreentax {
      grid-area: epsGreentax;
      display: grid;
      grid-template-rows: 1fr 1fr;
      grid-gap: 10px;
    }
  }

  .fineDiscountGrid,
  .groundServiceDiscountGrid,
  .transferDiscountGrid,
  .mealPlanDiscountGrid,
  .supplementDiscountGrid {
    display: grid;
    grid-gap: 20px;
    grid-template-areas:
      'category category closeButton'
      'formGrid formGrid .'
      'ageNamesMap ageNamesMap .'
      'discountInput maxQuantityInput .'
      'checkbox checkbox .';

    & > .formGrid {
      grid-area: formGrid;
    }
    & > .removeDiscountButton {
      grid-area: closeButton;
      text-align: right;
    }
    & > .discountInput {
      grid-area: discountInput;
    }
    & > .maxQuantityInput {
      grid-area: maxQuantityInput;
    }
    & > .occupancyCheckbox {
      grid-area: checkbox;
    }

    & > .ageNamesMap {
      grid-area: ageNamesMap;
    }

    & > .category {
      grid-area: category;
      margin: 0;
      border-bottom: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
    }
  }

  .steppingGrid,
  .extraPersonSupplement,
  .fineDiscountGrid,
  .groundServiceDiscountGrid,
  .transferDiscountGrid,
  .mealPlanDiscountGrid,
  .supplementDiscountGrid {
    border-bottom: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
`;
