import React from 'react';
import { OfferEditApplicationsContainer } from '..';
import { shallow } from 'enzyme';
import {
  IUIOfferProductDiscountInstance,
  EProductCategory,
  IAgeName,
} from '../../../services/BackendApi/types/OfferResponse';
import { EGreenTaxApproach, GreenTaxApproachInfo } from '../../../utils/greenTax';
import { CloseButton } from 'pureUi/Buttons';
import { Legend } from 'pureUi/forms/Fieldset';
import TextInput from 'pureUi/TextInput';
import Checkbox from 'pureUi/Checkbox';
import { AccordianSection } from 'pureUi/Accordian';
import Label, { ILabelProps } from 'pureUi/Label';
import { createProps, createValidaitonErrors, setupTest, makeAvailableProducts } from './testHelpers';

describe('OfferEditContainer Edit Mode', () => {
  it('displays a message for text only offers', () => {
    const subject = shallow(<OfferEditApplicationsContainer {...createProps({ isTextOnly: true })} />);
    const textOnlyMessage = subject.find('.textOnly');
    expect(textOnlyMessage.length).toBe(1);
  });
});
