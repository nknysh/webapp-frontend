import React, { memo, LiHTMLAttributes } from 'react';
import { SearchOptions } from 'services/BackendApi';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  items: any[];
  render: (items) => any;
}

export const List = (props: ListProps) => {
  return <ul>{props.items.map((item, index) => props.render(item))}</ul>;
};
