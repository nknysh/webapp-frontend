import React, { useState } from 'react';
import SortableList, { SortableListProps } from './';

interface SampleItem {
  uuid: string;
  label: string;
}

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
    renderItem: item => item.label,
    onChange: setItems
  };

  return (
    <SortableList<SampleItem> {...props}/>
  );
};
