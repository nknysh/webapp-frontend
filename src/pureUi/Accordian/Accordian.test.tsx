import React from 'react';
import { mount } from 'enzyme';
import { Accordian, AccordianSection } from '.';

describe('Accordian', () => {
  it('render correctly', () => {
    let wrapper = mount(
      <Accordian>
        <AccordianSection title="Section 1" isOpen={false} onClick={jest.fn(() => 'item1')} suffix="1 Item">
          <p>Accordian Item 1</p>
        </AccordianSection>
        <AccordianSection title="Section 2" isOpen={true} onClick={jest.fn(() => 'item2')}>
          <p>Accordian Item 2</p>
          <p>Accordian Item 2</p>
          <p>Accordian Item 2</p>
          <p>Accordian Item 2</p>
          <p>Accordian Item 2</p>
        </AccordianSection>
        <AccordianSection title="Section 3" isOpen={false} onClick={jest.fn(() => 'item3')}>
          <p>Accordian Item 3</p>
          <p>Accordian Item 3</p>
          <p>Accordian Item 3</p>
        </AccordianSection>
        <AccordianSection title="Section 4" isOpen={true} onClick={jest.fn(() => 'item4')}>
          <p>Accordian Item 4</p>
          <p>Accordian Item 4</p>
          <p>Accordian Item 4</p>
          <p>Accordian Item 4</p>
          <p>Accordian Item 4</p>
          <p>Accordian Item 4</p>
        </AccordianSection>
      </Accordian>
    );
    // Checting here, but it's a super simple component
    expect(wrapper).toMatchSnapshot();
  });
});
