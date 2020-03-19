import * as React from 'react';
import { shallow } from 'enzyme';
import { ERatesImportReportItemKey, IRatesImportData } from 'services/BackendApi';

import Report, { ReportProps, StyledHeading, ErrorMessage, StyledReportItem } from './Report';

const createProps = (overrides: Partial<IRatesImportData> = {}): ReportProps => ({
  data: {
    success: true,
    report: [{
      "key": ERatesImportReportItemKey.ACCOMMODATION_RATES,
      "total": 15,
      "warnings": [],
      "errors": []
    }],
    ...overrides
  }
});

describe('Report', () => {

  it('displays the correct UI for successful import', () => {
    const props = createProps();
    const wrapper = shallow(<Report {...props} />);

    expect(wrapper.find(StyledHeading).text()).toContain('Status: Success');
    expect(wrapper.exists(ErrorMessage)).toBe(false);
    expect(wrapper.find(StyledReportItem)).toHaveLength(1);
  });

  it('displays the correct UI for failed import', () => {
    const props = createProps({
      success: false
    });
    const wrapper = shallow(<Report {...props} />);

    expect(wrapper.find(StyledHeading).text()).toContain('Status: Fail');
    expect(wrapper.exists(ErrorMessage)).toBe(false);
    expect(wrapper.find(StyledReportItem)).toHaveLength(1);
  });

  it('displays the correct UI when there was an error', () => {
    const props = createProps({
      success: false,
      report: undefined,
      error: 'Error while importing rates'
    });
    const wrapper = shallow(<Report {...props} />);

    expect(wrapper.find(StyledHeading).text()).toContain('Status: Fail');
    expect(wrapper.find(ErrorMessage).text()).toContain('Error: Error while importing rates');
    expect(wrapper.exists(StyledReportItem)).toBe(false);
  });

});