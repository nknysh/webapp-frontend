import * as React from 'react';
import { shallow } from 'enzyme';
import LatestStatusInfo, { LatestStatusInfoProps } from './LatestStatusInfo';
import { ratesImportStatus as mockRatesImportStatus } from 'store/modules/ratesImport/tests/mock';

const createProps = (): LatestStatusInfoProps => ({
  status: mockRatesImportStatus
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