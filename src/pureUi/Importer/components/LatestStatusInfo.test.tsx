import * as React from 'react';
import { shallow } from 'enzyme';
import LatestStatusInfo, { LatestStatusInfoProps } from './LatestStatusInfo';
import { importStatus as mockImportStatus } from 'store/modules/importer/tests/mock';

const createProps = (): LatestStatusInfoProps => ({
  status: mockImportStatus
});

describe('LatestStatusInfo', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LatestStatusInfo {...createProps()} />);
  });

  it('displays the correct UI', () => {
    expect(wrapper.text()).toContain('Latest import: Done');
  });

});