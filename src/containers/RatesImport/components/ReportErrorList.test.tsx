import * as React from 'react';
import { shallow } from 'enzyme';

import ReportErrorList, {
  ErrorItem,
  ErrorRef,
  ErrorMessageList,
  ErrorItemProps,

  Title,
  ErrorList,
  ReportErrorListProps
} from './ReportErrorList';

const createErrorItemProps = (hash: number = 0): ErrorItemProps => ({
  data: {
    ref: `sample / ref ${hash}`,
    messages: [
      'first message',
      'second message'
    ]
  }
});

describe('ReportErrorItem', () => {

  it('displays the correct UI', () => {
    const props = createErrorItemProps();
    const wrapper = shallow(<ErrorItem {...props} />);

    expect(wrapper.exists(ErrorRef)).toBe(true);
    expect(wrapper.exists(ErrorMessageList)).toBe(true);
    
    expect(wrapper.find(ErrorRef).text()).toEqual(props.data.ref);
    expect(wrapper.find(ErrorMessageList).children()).toHaveLength(props.data.messages.length);

  });

});

const createReportErrorListProps = (): ReportErrorListProps => ({
  title: 'Errors',
  items: Array
    .from({ length: 2 })
    .map((_, idx) => createErrorItemProps(idx).data)
});

describe('ReportErrorList', () => {

  it('displays the correct UI', () => {
    const props = createReportErrorListProps();
    const wrapper = shallow(<ReportErrorList {...props} />);

    expect(wrapper.exists(Title)).toBe(true);
    expect(wrapper.exists(ErrorList)).toBe(true);
    
    expect(wrapper.find(Title).text()).toEqual(props.title);
    expect(wrapper.find(ErrorList).children()).toHaveLength(props.items.length);
  });

});