import {
  IUIOfferProductDiscountInstance,
  EProductCategory,
  IAgeName,
} from '../../../services/BackendApi/types/OfferResponse';
import { createValidaitonErrors, setupTest, makeAvailableProducts } from './testHelpers';
import { CloseButton } from '../../../pureUi/Buttons';
import { Legend } from '../../../pureUi/forms/Fieldset';
import TextInput from '../../../pureUi/TextInput';
import Checkbox from '../../../pureUi/Checkbox';
import { AccordianSection } from '../../../pureUi/Accordian';
import { Label, ILabelProps } from '../../../pureUi/Label/index';

describe('Offer Edit Applicaions: Ground Service Discount', () => {
  const fieldsetClass = '.groundServiceDiscountFieldset';
  const discountClass = '.groundServiceDiscountGrid';
  const fieldName = 'groundServiceDiscounts';
  let groundServiceDiscountProps;
  let groundServiceDiscountSubject;

  const groundServiceDiscounts: IUIOfferProductDiscountInstance[] = [
    {
      uuid: 'GROUNDSERVICE_DISCOUNT_UUID_1',
      discountPercentage: 2.45,
      products: [],
      productCategory: EProductCategory.PER_BOOKING,
    },
    {
      uuid: 'GROUNDSERVICE_DISCOUNT_UUID_2',
      discountPercentage: 2.57,
      productCategory: EProductCategory.PER_BOOKING,
      products: [],
    },
    {
      uuid: 'GROUNDSERVICE_DISCOUNT_UUID_3',
      discountPercentage: 3.78,
      productCategory: EProductCategory.PER_BOOKING,
      products: [],
    },
    {
      uuid: 'GROUNDSERVICE_DISCOUNT_UUID_PER_PESON_1',
      discountPercentage: 4.44,
      maximumQuantity: 5,
      standardOccupancyOnly: true,
      productCategory: EProductCategory.PER_PERSON,
      products: [],
    },
    {
      uuid: 'GROUNDSERVICE_DISCOUNT_UUID_PER_PESON_2',
      discountPercentage: 4.44,
      maximumQuantity: 5,
      standardOccupancyOnly: false,
      productCategory: EProductCategory.PER_PERSON,
      products: [],
    },
    {
      uuid: 'GROUNDSERVICE_DISCOUNT_UUID_PER_PESON_2',
      discountPercentage: 4.44,
      maximumQuantity: 5,
      standardOccupancyOnly: false,
      products: [],
    },
  ];

  const validationErrors = createValidaitonErrors({
    [fieldName]: [{ field: fieldName, message: 'Some error' }],
  });

  const availableGroundServiceProducts = makeAvailableProducts('groundService', [
    EProductCategory.PER_BOOKING,
    EProductCategory.PER_BOOKING,
  ]);

  beforeEach(() => {
    const { props, subject } = setupTest(fieldsetClass, {
      groundServiceDiscounts,
      availableGroundServiceProducts,
    });

    groundServiceDiscountProps = props;
    groundServiceDiscountSubject = subject;
  });

  it('Renders a message if there is no hotel uuid', () => {
    const { subject } = setupTest(fieldsetClass, { hotelUuid: undefined });
    expect(subject.find('.noHotel').length).toBe(1);
  });

  it('renders multiple groundServiceDiscounts', () => {
    expect(groundServiceDiscountSubject.find(discountClass).length).toBe(groundServiceDiscountProps[fieldName].length);
  });

  it('renders the correct product category', () => {
    const labels = groundServiceDiscountSubject.at(0).find('.category');
    expect(
      labels
        .at(0)
        .props()
        .children.join('')
    ).toStrictEqual('Product Category: perBooking');
    expect(
      labels
        .at(4)
        .props()
        .children.join('')
    ).toStrictEqual('Product Category: perPerson');
    expect(
      labels
        .at(5)
        .props()
        .children.join('')
    ).toStrictEqual('Product Category: None Selected');
  });

  it('handles the remove discount event correctly', () => {
    groundServiceDiscountSubject
      .find(discountClass)
      .at(0)
      .find(CloseButton)
      .simulate('click');
    expect(groundServiceDiscountProps.offerRemoveProductDiscountAction).toHaveBeenCalledTimes(1);
    expect(groundServiceDiscountProps.offerRemoveProductDiscountAction).toHaveBeenCalledWith(
      'Ground Service',
      'GROUNDSERVICE_DISCOUNT_UUID_1'
    );
  });

  it('handles the add discount event correctly', () => {
    groundServiceDiscountSubject.find('.addDiscount').simulate('click');

    expect(groundServiceDiscountProps.offerAddProductDiscountAction).toHaveBeenCalledTimes(1);
    expect(groundServiceDiscountProps.offerAddProductDiscountAction).toHaveBeenCalledWith('Ground Service');
  });

  describe('Validaitons', () => {
    it('Set the Legend error prop', () => {
      const { subject } = setupTest(fieldsetClass, {
        groundServiceDiscounts,
        validationErrors,
        offerIsPristine: false,
      });
      expect(subject.find(Legend).props().isError).toBe(true);
    });

    it('Does not render any validations if pristine', () => {
      const { subject } = setupTest(fieldsetClass, {
        groundServiceDiscounts,
        validationErrors,
        offerIsPristine: true,
      });
      const errors = subject.find('.errorlist').find('li');
      expect(errors.length).toBe(0);
    });

    it('renders errors', () => {
      const { subject } = setupTest(fieldsetClass, {
        groundServiceDiscounts,
        validationErrors,
        offerIsPristine: false,
      });
      const errors = subject.find('.errorlist').find('li');
      expect(errors.length).toBe(1);
    });
  });

  describe('Discount Percentage', () => {
    it('Renders the correct value for the first discount', () => {
      const inputValue = groundServiceDiscountSubject
        .find(discountClass)
        .at(0)
        .find('.discountInput')
        .find(TextInput)
        .props().value;

      expect(inputValue).toBe(groundServiceDiscounts[0].discountPercentage);
    });

    it('renders the correct value for the second discount', () => {
      const inputValue = groundServiceDiscountSubject
        .find(discountClass)
        .at(1)
        .find('.discountInput')
        .find(TextInput)
        .props().value;

      expect(inputValue).toBe(groundServiceDiscounts[1].discountPercentage);
    });

    it('handles the change event for the first discount', () => {
      groundServiceDiscountSubject
        .find(discountClass)
        .at(0)
        .find('.discountInput')
        .find(TextInput)
        .simulate('change', { currentTarget: { value: '999' } });

      expect(groundServiceDiscountProps.offerUpdateProductDiscountAction).toHaveBeenCalledTimes(1);
      expect(groundServiceDiscountProps.offerUpdateProductDiscountAction).toHaveBeenCalledWith(
        'Ground Service',
        'GROUNDSERVICE_DISCOUNT_UUID_1',
        'discountPercentage',
        '999'
      );
    });

    it('handles the change event for the second discount', () => {
      groundServiceDiscountSubject
        .find(discountClass)
        .at(1)
        .find('.discountInput')
        .find(TextInput)
        .simulate('change', { currentTarget: { value: '999' } });

      expect(groundServiceDiscountProps.offerUpdateProductDiscountAction).toHaveBeenCalledTimes(1);
      expect(groundServiceDiscountProps.offerUpdateProductDiscountAction).toHaveBeenCalledWith(
        'Ground Service',
        'GROUNDSERVICE_DISCOUNT_UUID_2',
        'discountPercentage',
        '999'
      );
    });
  });

  describe('Maximum Quanity', () => {
    it('Does not render a maximum quantity input for perBooking products', () => {
      const maxQuantity = groundServiceDiscountSubject
        .find(discountClass)
        .at(0)
        .find('.maxQuantityInput');
      expect(maxQuantity.length).toBe(0);
    });

    it('Renders the correct value for the first discount', () => {
      const inputValue = groundServiceDiscountSubject
        .find(discountClass)
        .at(3)
        .find('.maxQuantityInput')
        .find(TextInput)
        .props().value;

      expect(inputValue).toBe(groundServiceDiscounts[3].maximumQuantity);
    });

    it('handles the change event for the first discount', () => {
      groundServiceDiscountSubject
        .find(discountClass)
        .at(3)
        .find('.maxQuantityInput')
        .find(TextInput)
        .simulate('change', { currentTarget: { value: '999' } });

      expect(groundServiceDiscountProps.offerUpdateProductDiscountAction).toHaveBeenCalledTimes(1);
      expect(groundServiceDiscountProps.offerUpdateProductDiscountAction).toHaveBeenCalledWith(
        'Ground Service',
        'GROUNDSERVICE_DISCOUNT_UUID_PER_PESON_1',
        'maximumQuantity',
        '999'
      );
    });
  });

  describe('Standard Occupancy', () => {
    it('Does not render a standard occupancy input for perBooking products', () => {
      const maxQuantity = groundServiceDiscountSubject
        .find(discountClass)
        .at(0)
        .find('.occupancyCheckbox');
      expect(maxQuantity.length).toBe(0);
    });

    it('renders the correct value for the fourth discount', () => {
      const inputValue = groundServiceDiscountSubject
        .find(discountClass)
        .at(3)
        .find('.occupancyCheckbox')
        .find(Checkbox)
        .props().checked;

      expect(inputValue).toBe(groundServiceDiscounts[3].standardOccupancyOnly);
    });

    it('renders the correct value for the fifth discount', () => {
      const inputValue = groundServiceDiscountSubject
        .find(discountClass)
        .at(4)
        .find('.occupancyCheckbox')
        .find(Checkbox)
        .props().checked;

      expect(inputValue).toBe(groundServiceDiscounts[4].standardOccupancyOnly);
    });

    it('handles the change event correctly', () => {
      groundServiceDiscountSubject
        .find(discountClass)
        .at(4)
        .find('.occupancyCheckbox')
        .find(Checkbox)
        .simulate('change', { currentTarget: { checked: true } });

      expect(groundServiceDiscountProps.offerUpdateProductDiscountAction).toHaveBeenCalledTimes(1);
      expect(groundServiceDiscountProps.offerUpdateProductDiscountAction).toHaveBeenCalledWith(
        'Ground Service',
        'GROUNDSERVICE_DISCOUNT_UUID_PER_PESON_2',
        'standardOccupancyOnly',
        true
      );
    });
  });

  describe('Age names', () => {
    const ageNames: IAgeName[] = [
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

    const discountsWithProducts: IUIOfferProductDiscountInstance[] = [
      {
        uuid: 'GROUNDSERVICE_DISCOUNT_UUID_1',
        discountPercentage: 2.45,
        products: [{ uuid: 'GROUND SERVICE_PRODUCT_0', ageNames: ['Child', 'Infant'] }],
        productCategory: EProductCategory.PER_PERSON,
      },
      {
        uuid: 'GROUNDSERVICE_DISCOUNT_UUID_2',
        discountPercentage: 2.45,
        products: [],
        productCategory: EProductCategory.PER_PERSON,
      },
    ];

    const availableGroundServiceProducts = makeAvailableProducts(
      'Ground Service',
      [EProductCategory.PER_PERSON],
      ageNames
    );

    it('Renders the age names accordian correctly', () => {
      const { subject } = setupTest(fieldsetClass, {
        groundServiceDiscounts: discountsWithProducts,
        availableGroundServiceProducts,
      });

      expect(
        subject
          .find(discountClass)
          .at(0)
          .find(AccordianSection).length
      ).toBe(1);

      expect(
        subject
          .find(discountClass)
          .at(0)
          .find(AccordianSection)
          .at(0)
          .props().title
      ).toBe('Ages for Test product 0');

      expect(
        subject
          .find(discountClass)
          .at(1)
          .find(AccordianSection).length
      ).toBe(0);
    });

    it('Renders the check boxes correctly', () => {
      const { subject } = setupTest(fieldsetClass, {
        groundServiceDiscounts: discountsWithProducts,
        availableGroundServiceProducts,
      });

      const labels = subject
        .find(discountClass)
        .at(0)
        .find(AccordianSection)
        .at(0)
        .find('.ageNameLabel');

      expect(labels.length).toBe(3);

      expect((labels.at(0).props() as ILabelProps).text).toBe('Adult');
      expect((labels.at(1).props() as ILabelProps).text).toBe('Child');
      expect((labels.at(2).props() as ILabelProps).text).toBe('Infant');
    });

    it('Handles an age name change event correctly', () => {
      const { props, subject } = setupTest(fieldsetClass, {
        groundServiceDiscounts: discountsWithProducts,
        availableGroundServiceProducts,
      });

      const checkBoxes = subject
        .find(discountClass)
        .at(0)
        .find(AccordianSection)
        .at(0)
        .find(Checkbox);

      checkBoxes.forEach(checkbox => {
        checkbox.simulate('change', { currentTarget: { checked: true } });
      });

      expect(props.offerToggleAgeNameOnProductAction).toHaveBeenCalledTimes(3);
      expect(props.offerToggleAgeNameOnProductAction).toHaveBeenNthCalledWith(
        1,
        'Ground Service',
        'GROUNDSERVICE_DISCOUNT_UUID_1',
        'GROUND SERVICE_PRODUCT_0',
        'Adult'
      );
      expect(props.offerToggleAgeNameOnProductAction).toHaveBeenNthCalledWith(
        2,
        'Ground Service',
        'GROUNDSERVICE_DISCOUNT_UUID_1',
        'GROUND SERVICE_PRODUCT_0',
        'Child'
      );
      expect(props.offerToggleAgeNameOnProductAction).toHaveBeenNthCalledWith(
        3,
        'Ground Service',
        'GROUNDSERVICE_DISCOUNT_UUID_1',
        'GROUND SERVICE_PRODUCT_0',
        'Infant'
      );
    });
  });

  describe('Available Products', () => {
    const availableGroundServiceProducts = makeAvailableProducts('Ground Service', [
      EProductCategory.PER_PERSON,
      EProductCategory.PER_PERSON,
    ]);

    it('Renders the product labels correctly', () => {
      const { subject } = setupTest(fieldsetClass, {
        groundServiceDiscounts,
        availableGroundServiceProducts,
      });

      const labels = subject.find('.availableProducts').find(Label);
      expect(labels.at(0).props().text).toBe('Test product 0');
      expect(labels.at(1).props().text).toBe('Test product 1');
    });

    it('handles the change event correctly', () => {
      const { props, subject } = setupTest(fieldsetClass, {
        groundServiceDiscounts,
        availableGroundServiceProducts,
      });

      subject
        .find('.availableProducts')
        .at(0)
        .find(Checkbox)
        .forEach(checkbox => {
          checkbox.simulate('change', { currenTarget: { checked: true } });
        });

      expect(props.offerToggleProductOnProductDiscountAction).toHaveBeenCalledTimes(2);
      expect(props.offerToggleProductOnProductDiscountAction).toHaveBeenNthCalledWith(
        1,
        'Ground Service',
        'GROUNDSERVICE_DISCOUNT_UUID_1',
        'GROUND SERVICE_PRODUCT_0'
      );
      expect(props.offerToggleProductOnProductDiscountAction).toHaveBeenNthCalledWith(
        2,
        'Ground Service',
        'GROUNDSERVICE_DISCOUNT_UUID_1',
        'GROUND SERVICE_PRODUCT_1'
      );
    });

    it('disables checkboxes correctly', () => {
      const availableGroundServiceProducts = makeAvailableProducts('groundService', [
        EProductCategory.PER_BOOKING,
        EProductCategory.PER_PERSON,
      ]);

      const { subject } = setupTest(fieldsetClass, {
        groundServiceDiscounts,
        availableGroundServiceProducts,
      });

      const checkboxes = subject
        .find('.availableProducts')
        .at(0)
        .find(Checkbox);

      expect(checkboxes.at(0).props().disabled).toBe(false);
      expect(checkboxes.at(1).props().disabled).toBe(true);
    });
  });
});
