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

  .extraPersonSupplement {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      'ageNames ageNames ageNames epsCloseButton'
      'discountInput maxQuantityInput epsGreentax epsGreentax';

    & > .ageNames {
      grid-area: ageNames;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 20px;
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
  .groundServiceDiscountGrid {
    display: grid;
    grid-gap: 20px;
    grid-template-areas:
      'formGrid formGrid closeButton'
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
  }

  .extraPersonSupplement,
  .fineDiscountGrid,
  .groundServiceDiscountGrid {
    border-bottom: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
`;
