import * as React from 'react';
import { shallow } from 'enzyme';

import { PrimaryButton, SecondaryButton } from 'pureUi/Buttons';
import ConfirmationModal, { ConfirmationModalProps } from './ConfirmationModal';

const createProps = (): ConfirmationModalProps => ({
  onCancel: jest.fn(),
  onOk: jest.fn()
});

describe('ConfirmationModal', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = createProps();
    wrapper = shallow(<ConfirmationModal {...props} />);
  });

  it('calls onOk when confirmed', () => {
    let eventEmitter = wrapper.find(PrimaryButton);
    eventEmitter.simulate('click');
    
    expect(props.onOk).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when canceled', () => {
    let eventEmitter = wrapper.find(SecondaryButton);
    eventEmitter.simulate('click');
    
    expect(props.onCancel).toHaveBeenCalledTimes(1);
  });

});
