import * as React from 'react';
import { shallow } from 'enzyme';

import CustomItemForm, { CustomItemFormProps } from './';
import { ActionButton } from '../Buttons';

const createProps = (overwrites: Partial<CustomItemFormProps> = {}): CustomItemFormProps => ({
  data: {
    name: 'sample name',
    total: '10.00',
    description: 'sample description',
    countsAsMealPlan: true,
    countsAsTransfer: true
  },
  validation: null,
  currency: '$',
  onShow: jest.fn(),
  onNameChange: jest.fn(),
  onTotalChange: jest.fn(),
  onDescriptionChange: jest.fn(),
  onCountAsMealPlanChange: jest.fn(),
  onCountAsTransferChange: jest.fn(),
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
  ...overwrites
});

describe('CustomItemForm', () => {

  it('renders Add button when no data is passed', () => {
    const props = createProps({ data: null });
    const wrapper = shallow(<CustomItemForm {...props} />);

    expect(wrapper.exists(ActionButton)).toBe(true);
    expect(wrapper.find(ActionButton).prop('action')).toBe('add');

  });

  it('calls onShow when Add button is clicked', () => {
    const props = createProps({ data: null });
    const wrapper = shallow(<CustomItemForm {...props} />);

    wrapper.find(ActionButton).simulate('click');
    expect(props.onShow).toHaveBeenCalledTimes(1);
  });

  it('sets proper values for inputs', () => {
    const props = createProps();
    const wrapper = shallow(<CustomItemForm {...props} />);
    
    if(!props.data){
      throw new Error('Prop data incorrectly set');
    }

    expect(wrapper.find('[name="name"]').prop('value')).toBe(props.data.name);
    expect(wrapper.find('[name="total"]').prop('value')).toBe(props.data.total);
    expect(wrapper.find('[name="description"]').prop('value')).toBe(props.data.description);
    expect(wrapper.find('[name="countsAsMealPlan"]').prop('checked')).toBe(props.data.countsAsMealPlan);
    expect(wrapper.find('[name="countsAsTransfer"]').prop('checked')).toBe(props.data.countsAsTransfer);

  });

  it('calls handlers when values changes', () => {
    const props = createProps();
    const wrapper = shallow(<CustomItemForm {...props} />);
    
    if(!props.data){
      throw new Error('Prop data incorrectly set');
    }

    wrapper.find('[name="name"]').simulate('change', { currentTarget: { value: 'a' } });
    expect(props.onNameChange).toBeCalledWith('a');

    wrapper.find('[name="total"]').simulate('change', { currentTarget: { value: '1' } });
    expect(props.onTotalChange).toBeCalledWith('1');
    
    wrapper.find('[name="description"]').simulate('change', { currentTarget: { value: 'a' } });
    expect(props.onDescriptionChange).toBeCalledWith('a');

    wrapper.find('[name="countsAsMealPlan"]').simulate('change', { currentTarget: { checked: false } });
    expect(props.onCountAsMealPlanChange).toBeCalledWith(false);

    wrapper.find('[name="countsAsTransfer"]').simulate('change', { currentTarget: { checked: false } });
    expect(props.onCountAsTransferChange).toBeCalledWith(false);

  });

  it('calls onConfirm and onCancel when controls are clicked', () => {
    const props = createProps();
    const wrapper = shallow(<CustomItemForm {...props} />);

    wrapper.find('[name="confirm"]').simulate('click');
    expect(props.onConfirm).toHaveBeenCalledTimes(1);

    wrapper.find('[name="cancel"]').simulate('click');
    expect(props.onCancel).toHaveBeenCalledTimes(1);

  });

  it('disables Confirm button when there are validation errors', () => {
    const props = createProps({
      validation: {
        name: ['Required']
      }
    });

    const wrapper = shallow(<CustomItemForm {...props} />);
    expect(wrapper.find('[name="confirm"]').prop('disabled')).toBe(true);

  });

  it('enabled Confirm button when there is no validation errors', () => {
    const props = createProps({
      validation: {
        name: []
      }
    });

    const wrapper = shallow(<CustomItemForm {...props} />);
    expect(wrapper.find('[name="confirm"]').prop('disabled')).toBe(false);

  });

});
