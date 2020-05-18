import * as React from 'react';
import { shallow } from 'enzyme';

import { RatesImportContainer, IRatesImportProps } from './';
import { ratesImportStatus as mockRatesImportStatus } from 'store/modules/ratesImport/tests/mock';

import { PrimaryButton } from 'pureUi/Buttons';
import Report from './components/Report';
import LatestStatusInfo from './components/LatestStatusInfo';
import ConfirmationModal from './components/ConfirmationModal';

const createProps = (overrides: Partial<IRatesImportProps> = {}): IRatesImportProps => ({
  importRatesRequestIsPending: false,
  error: null,
  latestStatus: mockRatesImportStatus,
  workbookId: '123-456',
  confirmationModalOpen: false,
  ratesImportPageLoaded: jest.fn(),
  ratesImportPageUnloaded: jest.fn(),
  openRatesImportConfirmationModal: jest.fn(),
  confirmRatesImportIntent: jest.fn(),
  cancelRatesImportIntent: jest.fn(),
  ...overrides
});

describe('RatesImport', () => {

  it('displays the correct UI when latest status exist', () => {
    const props = createProps();
    const wrapper = shallow(<RatesImportContainer {...props} />);
    
    expect(wrapper.exists(PrimaryButton)).toBe(true);
    expect(wrapper.exists(LatestStatusInfo)).toBe(true);
    expect(wrapper.exists(Report)).toBe(true);
    expect(wrapper.exists('.editor')).toBe(true);
  });

  it('displays the correct UI when latest status does not exist', () => {
    const props = createProps({ latestStatus: null });
    const wrapper = shallow(<RatesImportContainer {...props} />);
    
    expect(wrapper.exists(PrimaryButton)).toBe(true);
    expect(wrapper.exists(LatestStatusInfo)).toBe(false);
    expect(wrapper.exists(Report)).toBe(false);
  });

  it('calls ratesImportPageLoaded on mount', () => {
    const props = createProps();
    shallow(<RatesImportContainer {...props} />);
    
    expect(props.ratesImportPageLoaded).toHaveBeenCalledTimes(1);
  });

  it('calls ratesImportPageUnloaded on unmount', () => {
    const props = createProps();
    shallow(<RatesImportContainer {...props} />).unmount();
    
    expect(props.ratesImportPageUnloaded).toHaveBeenCalledTimes(1);
  });

  it('calls openRatesImportConfirmationModal on Import click', () => {
    const props = createProps();
    const wrapper = shallow(<RatesImportContainer {...props} />);

    wrapper.find(PrimaryButton).simulate('click');
    expect(props.openRatesImportConfirmationModal).toHaveBeenCalledTimes(1);
  });

  it('shows modal when confirmationModalOpen is true', () => {
    const props = createProps({
      confirmationModalOpen: true
    });

    const wrapper = shallow(<RatesImportContainer {...props} />);
    expect(wrapper.exists(ConfirmationModal)).toBe(true);
    expect(wrapper.find(ConfirmationModal).prop('onOk')).toEqual(props.confirmRatesImportIntent);
    expect(wrapper.find(ConfirmationModal).prop('onCancel')).toEqual(props.cancelRatesImportIntent);
  });

});