import * as React from 'react';
import { shallow } from 'enzyme';

import Importer, { IImportProps } from './';
import { importStatus as mockImportStatus } from 'store/modules/importer/tests/mock';

import { PrimaryButton } from 'pureUi/Buttons';
import Report from './components/Report';
import LatestStatusInfo from './components/LatestStatusInfo';
import ConfirmationModal from './components/ConfirmationModal';

const createProps = (overrides: Partial<IImportProps> = {}): IImportProps => ({
  entityName: 'samples',
  importRequestIsPending: false,
  latestStatus: mockImportStatus,
  workbookId: '123-456',
  confirmationModalOpen: false,
  importPageLoaded: jest.fn(),
  importPageUnloaded: jest.fn(),
  openImportConfirmationModal: jest.fn(),
  confirmImportIntent: jest.fn(),
  cancelImportIntent: jest.fn(),
  ...overrides
});

describe('Importer', () => {

  it('displays the correct UI when latest status exist', () => {
    const props = createProps();
    const wrapper = shallow(<Importer {...props} />);
    
    expect(wrapper.exists(PrimaryButton)).toBe(true);
    expect(wrapper.exists(LatestStatusInfo)).toBe(true);
    expect(wrapper.exists(Report)).toBe(true);
    expect(wrapper.exists('.editor')).toBe(true);
  });

  it('displays the correct UI when latest status does not exist', () => {
    const props = createProps({ latestStatus: null });
    const wrapper = shallow(<Importer {...props} />);
    
    expect(wrapper.exists(PrimaryButton)).toBe(true);
    expect(wrapper.exists(LatestStatusInfo)).toBe(false);
    expect(wrapper.exists(Report)).toBe(false);
  });

  it('calls ImportPageLoaded on mount', () => {
    const props = createProps();
    shallow(<Importer {...props} />);
    
    expect(props.importPageLoaded).toHaveBeenCalledTimes(1);
  });

  it('calls ImportPageUnloaded on unmount', () => {
    const props = createProps();
    shallow(<Importer {...props} />).unmount();
    
    expect(props.importPageUnloaded).toHaveBeenCalledTimes(1);
  });

  it('calls openImportConfirmationModal on Import click', () => {
    const props = createProps();
    const wrapper = shallow(<Importer {...props} />);

    wrapper.find(PrimaryButton).simulate('click');
    expect(props.openImportConfirmationModal).toHaveBeenCalledTimes(1);
  });

  it('shows modal when confirmationModalOpen is true', () => {
    const props = createProps({
      confirmationModalOpen: true
    });

    const wrapper = shallow(<Importer {...props} />);
    expect(wrapper.exists(ConfirmationModal)).toBe(true);
    expect(wrapper.find(ConfirmationModal).prop('onOk')).toEqual(props.confirmImportIntent);
    expect(wrapper.find(ConfirmationModal).prop('onCancel')).toEqual(props.cancelImportIntent);
  });

});