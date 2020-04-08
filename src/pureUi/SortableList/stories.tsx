import React, { useState } from 'react';
import styled from 'styled-components';
import SortableList, { SortableListProps } from './';
import { pureUiTheme } from 'pureUi/pureUiTheme';


interface SampleItem {
  uuid: string;
  label: string;
}

const StyledItem = styled('div')`
  padding: 15px
  color: ${pureUiTheme.colorRoles.grayLabel};
  font-size: 12px;
  
  &.selected {
    font-weight: bold;
    background-color: ${pureUiTheme.colors.grayLight};
  }
`;

export const BasicUsage = () => {
  
  const [items, setItems] = useState(
    Array.from(
      { length: 5 },
      (v, i) => ({ uuid: `${i}-${i}`, label: `Item  ${i}` })
    )
  );

  const props: SortableListProps<SampleItem> = {
    items,
    keySelector: item => item.uuid,
    renderItem: item => (
      <StyledItem className={item.uuid === '2-2' ? 'selected' : ''}>{item.label}</StyledItem>
    ),
    onChange: setItems
  };

  return (
    <SortableList<SampleItem> {...props}/>
  );
};
