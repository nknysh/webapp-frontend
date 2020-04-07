import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import arrayMove from 'array-move';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';


export interface SortableListProps<T> {
  className?: string;
  items?: T[] | null;
  keySelector: (item: T, index: number) => number | string;
  renderItem: (item: T, index: number) => React.ReactNode;
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

  const keyValItems = useMemo(() =>
    items.map((item, index) => ({
      key: keySelector(item, index),
      value: renderItem(item, index)
    })),
    [items, keySelector, renderItem]
  );

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) =>
      onChange(arrayMove(items, oldIndex, newIndex)),
    [items, onChange]
  );
  
  return (
    <Wrapper className={className}>
      <InternalList
        helperClass="dragging"
        items={keyValItems}
        onSortEnd={onSortEnd}
        //@ts-ignore missing in exported by library type
        disableAutoscroll
      />
    </Wrapper>
  );
}

const StyledSortableList = styled(SortableList)`
  border: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
  background-color: ${pureUiTheme.colors.grayDepth3};
  cursor: grab;
`;

const StyledSortableItem = styled.div`
  color: ${pureUiTheme.colorRoles.grayLabel};
  font-size: 12px;
  padding: 15px;
  border-bottom: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
  background-color: #fff;

  &:last-of-type {
    border-bottom: 0;
  }

  &.dragging {
    opacity: 0.9;
    border: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2),
                0 -5px 5px -5px rgba(0, 0, 0, 0.2);
  }
`;

export const DefaultSortableList = <T,>(props: SortableListProps<T>) => {
  const { renderItem, ...rest } = props;

  const styledRenderItem = useCallback(
    (item: T, index: number) => (
      <StyledSortableItem>{renderItem(item, index)}</StyledSortableItem>
    ),
    [renderItem]
  );

  return (
    <StyledSortableList
      renderItem={styledRenderItem}
      {...rest}
    />
  );
};

export default DefaultSortableList;