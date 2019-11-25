import React, { memo } from 'react';
import { SearchOptions } from 'services/BackendApi';

export interface ListProps extends React.HTMLProps<HTMLUListElement> {
  items: any[];
  render: (items) => any;
}

export const List = (props: ListProps) => {
  return <ul className={props.className}>{props.items.map((item, index) => props.render(item))}</ul>;
};
