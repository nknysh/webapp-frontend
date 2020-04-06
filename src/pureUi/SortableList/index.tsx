import React from 'react';
import styled from 'styled-components';
import arrayMove from 'array-move';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';


export interface SortableListProps<T> {
  className?: string;
  items?: T[] | null;
  keySelector: (item: T) => number | string;
  renderItem: (item: T) => React.ReactNode;
  onChange: (items: T[]) => void;
}

const Wrapper = styled.div`
`;

const Content = styled.div`
  width: 100%;
`;

const InternalListItem = SortableElement(({ value }) => value);

const InternalList = SortableContainer(({ items }) => {
  return (
    <Content>
      {items.map((item, idx) => (
        <InternalListItem index={idx} key={item.key} value={item.value}/>
      ))}
    </Content>
  );
});

export const SortableList = <T,>(props: SortableListProps<T>) => {
  const { className, items, keySelector, renderItem, onChange } = props;
  
  if(!items){
    return null;
  }

  const keyValItems = items.map(item => ({
    key: keySelector(item),
    value: renderItem(item)
  }));

  const onSortEnd = ({ oldIndex, newIndex }) =>
    onChange(arrayMove(items, oldIndex, newIndex));

  return (
    <Wrapper className={className}>
      <InternalList
        helperClass="dragging"
        items={keyValItems}
        onSortEnd={onSortEnd}
      />
    </Wrapper>
  );
}

const StyledSortableList = styled(SortableList)`
  border: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
  background-color: ${pureUiTheme.colors.grayDepth3};
`;

const StyledSortableItem = styled.div`
  padding: 10px;
  border-bottom: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
  background-color: #fff;

  cursor: grab;

  &:last-of-type {
    border-bottom: 0;
  }

  &.dragging {
    cursor: grab;
    border: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2),
                0 -5px 5px -5px rgba(0, 0, 0, 0.2);
  }
`;

export const DefaultSortableList = <T,>(props: SortableListProps<T>) => {
  const { renderItem, ...rest } = props;

  return (
    <StyledSortableList
      renderItem={(item: T) => <StyledSortableItem>{renderItem(item)}</StyledSortableItem>}
      {...rest}
    />
  );
};

export default DefaultSortableList;