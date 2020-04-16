import { IUIOfferProductDiscountInstance } from '../../../services/BackendApi/types/OfferResponse';
import { EGreenTaxApproach, GreenTaxApproachInfo } from '../../../utils/greenTax';
import { CloseButton } from 'pureUi/Buttons';
import { Legend } from 'pureUi/forms/Fieldset';
import { createValidaitonErrors, setupTest } from './testHelpers';

// --------------------------------------------------------------------------
//
// Extra Person Supplement
//
// --------------------------------------------------------------------------
describe('Offer Edit Applicaions: Extra Person Supplement', () => {
  const fieldsetClass = '.extraPersonSupplementFieldset';
  const discountClass = '.extraPersonSupplement';
  const fieldName = 'extraPersonSupplementDiscounts';
  let epsDiscountProps;
  let epsDiscountSubject;

  const extraPersonSupplementDiscounts: IUIOfferProductDiscountInstance[] = [
    {
      uuid: 'EPS_DISCOUNT_UUID_1',
      discountPercentage: 1.1,
      maximumQuantity: 111,
      greenTaxDiscountApproach: EGreenTaxApproach.DISCOUNT_BEFORE_GREEN_TAX,
      products: [],
    },
    {
      uuid: 'EPS_DISCOUNT_UUID_2',
      discountPercentage: 2.2,
      maximumQuantity: 222,
      greenTaxDiscountApproach: EGreenTaxApproach.DISCOUNT_WITH_GREEN_TAX_AS_MINIMUM,
      products: [],
    },
    {
      uuid: 'EPS_DISCOUNT_UUID_3',
      discountPercentage: 2.2,
      maximumQuantity: 222,
      products: [],
    },
  ];

  const validationErrors = createValidaitonErrors({
    [fieldName]: [{ field: fieldName, message: 'Some error' }],
  });

  const accomodationAgeNames = [
    {
      name: 'Child',
      ageFrom: 3,
      ageTo: 17,
    },
    {
      name: 'Infant',
      ageFrom: 0,
      ageTo: 3,
    },
  ];

  beforeEach(() => {
    const { props, subject } = setupTest(fieldsetClass, {
      extraPersonSupplementDiscounts,
      accomodationAgeNames,
    });

    epsDiscountProps = props;
    epsDiscountSubject = subject;
  });

  it('Renders a message  if there is no hotel uuid', () => {
    const { subject } = setupTest(fieldsetClass, { hotelUuid: undefined });
    expect(subject.find('.noHotel').length).toBe(1);
  });

  it('renders multiple extraPersonSupplements', () => {
    expect(epsDiscountSubject.find(discountClass).length).toBe(epsDiscountProps.extraPersonSupplementDiscounts.length);
  });

  it('handles the remove discount event correctly', () => {
    epsDiscountSubject
      .find(discountClass)
      .at(0)
      .find(CloseButton)
      .simulate('click');
    expect(epsDiscountProps.offerRemoveSubProductDiscountAction).toHaveBeenCalledTimes(1);
    expect(epsDiscountProps.offerRemoveSubProductDiscountAction).toHaveBeenCalledWith(
      'Supplement',
      'EPS_DISCOUNT_UUID_1'
    );
  });

  it('handles the add discount event correctly', () => {
    epsDiscountSubject.find('.addDiscount').simulate('click');

    expect(epsDiscountProps.offerAddSubProductDiscountAction).toHaveBeenCalledTimes(1);
    expect(epsDiscountProps.offerAddSubProductDiscountAction).toHaveBeenCalledWith('Supplement', 'EPS_123');
  });

  describe('Validaitons', () => {
    it('Set the Legend error prop', () => {
      const { subject } = setupTest(fieldsetClass, {
        extraPersonSupplementDiscounts,
        validationErrors,
        offerIsPristine: false,
      });
      expect(subject.find(Legend).props().isError).toBe(true);
    });

    it('Does not render any validations if pristine', () => {
      const { subject } = setupTest(fieldsetClass, {
        extraPersonSupplementDiscounts,
        accomodationAgeNames,
        validationErrors,
        offerIsPristine: true,
      });
      const errors = subject.find('.errorlist').find('li');
      expect(errors.length).toBe(0);
    });

    it('renders errors', () => {
      const { subject } = setupTest(fieldsetClass, {
        extraPersonSupplementDiscounts,
        accomodationAgeNames,
        validationErrors,
        offerIsPristine: false,
      });
      const errors = subject.find('.errorlist').find('li');
      expect(errors.length).toBe(1);
    });
  });

  describe('Age names', () => {
    it('Renders the age names', () => {
      expect(
        epsDiscountSubject
          .find('.ageNames')
          .at(0)
          .find('.ageNameCheckbox').length
      ).toBe(accomodationAgeNames.length + 1); // +1 for Adult age name
    });

    it('Handles an age name change event correctly', () => {
      const inputs = epsDiscountSubject
        .find('.ageNames')
        .at(0)
        .find('.ageNameCheckbox');

      inputs.at(0).simulate('change', { currentTarget: { checked: true } });
      expect(epsDiscountProps.offerToggleSubProductDiscountAgeNameAction).toHaveBeenLastCalledWith(
        'Supplement',
        'EPS_DISCOUNT_UUID_1',
        'EPS_123',
        'Adult'
      );

      inputs.at(1).simulate('change', { currentTarget: { checked: true } });
      expect(epsDiscountProps.offerToggleSubProductDiscountAgeNameAction).toHaveBeenLastCalledWith(
        'Supplement',
        'EPS_DISCOUNT_UUID_1',
        'EPS_123',
        'Child'
      );

      inputs.at(2).simulate('change', { currentTarget: { checked: true } });
      expect(epsDiscountProps.offerToggleSubProductDiscountAgeNameAction).toHaveBeenLastCalledWith(
        'Supplement',
        'EPS_DISCOUNT_UUID_1',
        'EPS_123',
        'Infant'
      );
    });

    it('renders the correct age name labels in the correct order', () => {
      const labels = epsDiscountSubject
        .find('.ageNames')
        .at(0)
        .find('.ageNameLabel');

      expect(labels.at(0).props().text).toBe('Adult');
      expect(labels.at(1).props().text).toBe('Child ( 3 to 17 )');
      expect(labels.at(2).props().text).toBe('Infant ( 0 to 3 )');
    });
  });

  describe('Discount Percentage', () => {
    it('Renders the correct value for the first discount', () => {
      const inputValue = epsDiscountSubject
        .find(discountClass)
        .at(0)
        .find('.discountInput')
        .props().value;

      expect(inputValue).toBe(extraPersonSupplementDiscounts[0].discountPercentage);
    });

    it('renders the correct value for the second discount', () => {
      const inputValue = epsDiscountSubject
        .find('.extraPersonSupplement')
        .at(1)
        .find('.discountInput')
        .props().value;

      expect(inputValue).toBe(extraPersonSupplementDiscounts[1].discountPercentage);
    });

    it('handles the change event for the first discount', () => {
      epsDiscountSubject
        .find('.extraPersonSupplement')
        .at(0)
        .find('.discountInput')
        .simulate('change', { currentTarget: { value: '999' } });

      expect(epsDiscountProps.offerUpdateSubProductDiscountAction).toHaveBeenCalledTimes(1);
      expect(epsDiscountProps.offerUpdateSubProductDiscountAction).toHaveBeenCalledWith(
        'Supplement',
        'EPS_DISCOUNT_UUID_1',
        'discountPercentage',
        '999'
      );
    });

    it('handles the change event for the second discount', () => {
      epsDiscountSubject
        .find('.extraPersonSupplement')
        .at(1)
        .find('.discountInput')
        .simulate('change', { currentTarget: { value: '999' } });

      expect(epsDiscountProps.offerUpdateSubProductDiscountAction).toHaveBeenCalledTimes(1);
      expect(epsDiscountProps.offerUpdateSubProductDiscountAction).toHaveBeenCalledWith(
        'Supplement',
        'EPS_DISCOUNT_UUID_2',
        'discountPercentage',
        '999'
      );
    });
  });

  describe('Maximum Quantity', () => {
    it('Renders the correct value for the first discount', () => {
      const inputValue = epsDiscountSubject
        .find(discountClass)
        .at(0)
        .find('.maxQuantityInput')
        .props().value;

      expect(inputValue).toBe(extraPersonSupplementDiscounts[0].maximumQuantity);
    });

    it('renders the correct value for the second discount', () => {
      const inputValue1 = epsDiscountSubject
        .find('.extraPersonSupplement')
        .at(1)
        .find('.maxQuantityInput')
        .props().value;

      expect(inputValue1).toBe(extraPersonSupplementDiscounts[1].maximumQuantity);
    });

    it('handles the change event for the first discount', () => {
      epsDiscountSubject
        .find('.extraPersonSupplement')
        .at(0)
        .find('.maxQuantityInput')
        .simulate('change', { currentTarget: { value: '1' } });

      expect(epsDiscountProps.offerUpdateSubProductDiscountAction).toHaveBeenCalledTimes(1);
      expect(epsDiscountProps.offerUpdateSubProductDiscountAction).toHaveBeenCalledWith(
        'Supplement',
        'EPS_DISCOUNT_UUID_1',
        'maximumQuantity',
        '1'
      );
    });

    it('handles the change event for the second discount', () => {
      epsDiscountSubject
        .find('.extraPersonSupplement')
        .at(1)
        .find('.maxQuantityInput')
        .simulate('change', { currentTarget: { value: '2' } });

      expect(epsDiscountProps.offerUpdateSubProductDiscountAction).toHaveBeenCalledTimes(1);
      expect(epsDiscountProps.offerUpdateSubProductDiscountAction).toHaveBeenCalledWith(
        'Supplement',
        'EPS_DISCOUNT_UUID_2',
        'maximumQuantity',
        '2'
      );
    });
  });

  describe('Green tax approach', () => {
    it('renders the correct green tax options when green tax is not applicable', () => {
      const { subject } = setupTest(fieldsetClass, {
        extraPersonSupplementDiscounts,
        accomodationAgeNames,
        requiresGreenTax: true,
      });
      const opt = subject
        .find('.greenTaxSelect')
        .find('option')
        .at(0);

      expect(opt.props().children).toBe('Select a green tax approach');
    });

    it('renders the correct green tax options when green tax is not applicable', () => {
      const { subject } = setupTest(fieldsetClass, {
        extraPersonSupplementDiscounts,
        accomodationAgeNames,
        requiresGreenTax: false,
      });
      const opt = subject
        .find('.greenTaxSelect')
        .find('option')
        .at(0);

      expect(opt.props().children).toBe('Not Applicable');
    });

    it('renders the correct green tax info', () => {
      const { subject } = setupTest(fieldsetClass, {
        extraPersonSupplementDiscounts,
        accomodationAgeNames,
        requiresGreenTax: true,
      });

      const infos = subject.find('.info');
      expect(infos.at(0).props().children).toBe(GreenTaxApproachInfo[EGreenTaxApproach.DISCOUNT_BEFORE_GREEN_TAX]);
      expect(infos.at(1).props().children).toBe(
        GreenTaxApproachInfo[EGreenTaxApproach.DISCOUNT_WITH_GREEN_TAX_AS_MINIMUM]
      );
      expect(infos.at(2).props().children).toBe('No green tax approach selected');
    });

    it('Renders the correct value for the first discount', () => {
      const inputValue = epsDiscountSubject
        .find(discountClass)
        .at(0)
        .find('.greenTaxSelect')
        .props().value;

      expect(inputValue).toBe(extraPersonSupplementDiscounts[0].greenTaxDiscountApproach);
    });

    it('renders the correct value for the second discount', () => {
      const inputValue = epsDiscountSubject
        .find('.extraPersonSupplement')
        .at(1)
        .find('.greenTaxSelect')
        .props().value;

      expect(inputValue).toBe(extraPersonSupplementDiscounts[1].greenTaxDiscountApproach);
    });

    it('handles the change event for the first discount', () => {
      epsDiscountSubject
        .find('.extraPersonSupplement')
        .at(0)
        .find('.greenTaxSelect')
        .simulate('change', { currentTarget: { value: EGreenTaxApproach.DISCOUNT_WITH_GREEN_TAX } });

      expect(epsDiscountProps.offerUpdateSubProductDiscountAction).toHaveBeenCalledTimes(1);
      expect(epsDiscountProps.offerUpdateSubProductDiscountAction).toHaveBeenCalledWith(
        'Supplement',
        'EPS_DISCOUNT_UUID_1',
        'greenTaxDiscountApproach',
        EGreenTaxApproach.DISCOUNT_WITH_GREEN_TAX
      );
    });

    it('handles the change event for the second discount', () => {
      epsDiscountSubject
        .find('.extraPersonSupplement')
        .at(1)
        .find('.greenTaxSelect')
        .simulate('change', { currentTarget: { value: EGreenTaxApproach.DISCOUNT_WITH_GREEN_TAX_AS_MINIMUM } });

      expect(epsDiscountProps.offerUpdateSubProductDiscountAction).toHaveBeenCalledTimes(1);
      expect(epsDiscountProps.offerUpdateSubProductDiscountAction).toHaveBeenCalledWith(
        'Supplement',
        'EPS_DISCOUNT_UUID_2',
        'greenTaxDiscountApproach',
        EGreenTaxApproach.DISCOUNT_WITH_GREEN_TAX_AS_MINIMUM
      );
    });
  });
});
