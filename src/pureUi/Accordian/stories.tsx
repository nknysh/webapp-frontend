import React, { useState } from 'react';
import { Accordian, AccordianSection } from '.';
import { without } from 'ramda';

export const AccordianBasicUsage = () => {
  const [openKeys, setOpenKeys] = useState(['item2']);

  const toggleAccordianSection = (key: string) => () => {
    if (openKeys.includes(key)) {
      setOpenKeys(without([key], openKeys));
    } else {
      setOpenKeys([...openKeys, key]);
    }
  };

  return (
    <Accordian>
      <AccordianSection
        title="Section 1"
        isOpen={openKeys.includes('item1')}
        onClick={toggleAccordianSection('item1')}
        suffix="1 Item"
      >
        <p>Accordian Item 1</p>
      </AccordianSection>
      <AccordianSection title="Section 2" isOpen={openKeys.includes('item2')} onClick={toggleAccordianSection('item2')}>
        <p>Accordian Item 2</p>
        <p>Accordian Item 2</p>
        <p>Accordian Item 2</p>
        <p>Accordian Item 2</p>
        <p>Accordian Item 2</p>
      </AccordianSection>
      <AccordianSection title="Section 3" isOpen={openKeys.includes('item3')} onClick={toggleAccordianSection('item3')}>
        <p>Accordian Item 3</p>
        <p>Accordian Item 3</p>
        <p>Accordian Item 3</p>
      </AccordianSection>
      <AccordianSection title="Section 4" isOpen={openKeys.includes('item4')} onClick={toggleAccordianSection('item4')}>
        <p>Accordian Item 4</p>
        <p>Accordian Item 4</p>
        <p>Accordian Item 4</p>
        <p>Accordian Item 4</p>
        <p>Accordian Item 4</p>
        <p>Accordian Item 4</p>
      </AccordianSection>
    </Accordian>
  );
};
