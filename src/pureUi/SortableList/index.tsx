import React from 'react';
import styled from 'styled-components';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

export interface SortableListItem {
  key: number | string;
  label: React.ReactElement;
  value?: any;
}

export interface SortableListProps {
  className?: string;
  items?: SortableListItem[] | null
}
//TODO { keyFn, labelFn, items }

const InternalList = SortableContainer(({ items }) => {
  return null;
});

const InternalListItem = SortableElement(({ value }) => null);

const Wrapper = styled.div``;

const SortableList = (props: SortableListProps) => {
  const { className, items } = props;

  return (
    <Wrapper className={className}>
      Sortable list content
    </Wrapper>
  );
}


export default SortableList;