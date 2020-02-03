import React from 'react';
import { PortalType, renderPortal, appendPortalElements } from '../index';
import { mount } from 'enzyme';

const TestComponent = () => <div>{renderPortal(<p id="content">Hello</p>, PortalType.Overlay)}</div>;
describe('renderPortal', () => {
  let subject;
  beforeAll(() => {
    appendPortalElements();
    subject = mount(<TestComponent />);
  });

  it('renders a portal container', () => {
    expect(document.body).toMatchSnapshot();
  });
});
