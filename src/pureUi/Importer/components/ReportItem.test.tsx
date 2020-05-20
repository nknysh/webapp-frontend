import * as React from 'react';
import { shallow } from 'enzyme';
import { EImportReportItemKey } from 'services/BackendApi';

import ReportItem, { ReportItemProps, HeaderInfo, Totals, StyledReportErrorList } from './ReportItem';

const generateErrorItem = (hash: number) => ({
  ref: `sample / ref ${hash}`,
  messages: [
    `first message ${hash}`,
    `second message ${hash}`
  ]
});

const createProps = (): ReportItemProps => ({
  data: {
    key: EImportReportItemKey.ACCOMMODATION_RATES,
    total: 10,
    warnings: [generateErrorItem(0)],
    errors: Array.from({ length: 5 }).map((_, idx) =>  generateErrorItem(idx))
  }
});

describe('ReportErrorList', () => {

  it('displays the correct UI', () => {
    const props = createProps();
    const wrapper = shallow(<ReportItem {...props} />);

    expect(wrapper.find(HeaderInfo).text()).toContain('Accommodation ');
    expect(wrapper.find(Totals).text()).toContain('5 insertable (1 with warnings) | 5 errors');

    const errorLists = wrapper.find(StyledReportErrorList);
    expect(errorLists).toHaveLength(2);
    
    expect(errorLists.at(0).prop('title')).toContain('Warnings');
    expect(errorLists.at(0).prop('items')).toEqual(props.data.warnings);

    expect(errorLists.at(1).prop('title')).toContain('Errors');
    expect(errorLists.at(1).prop('items')).toEqual(props.data.errors);

  });

});