import React, { HTMLProps, useCallback } from 'react';
import styled from 'styled-components';
import { pureUiTheme } from '../pureUiTheme';
import { ChevronRight, ChevronLeft } from '@material-ui/icons';

export interface IPaginationProps extends HTMLProps<HTMLDivElement> {
  pageCount: number;
  currentPage: number;
  onPageSelect: (pageNumber: number) => void;
}
export const PaginationComponent = (props: IPaginationProps) => {
  const handleClick = useCallback(
    (pageNumber: number) => () => {
      props.onPageSelect(pageNumber);
    },
    [props.pageCount]
  );

  return (
    <div className={props.className}>
      <PaginationButton className="prev" disabled={props.currentPage === 1} onClick={handleClick(1)}>
        <ChevronLeft />
      </PaginationButton>
      {Array.from({ length: props.pageCount }).map((_, idx: number) => (
        <PaginationButton
          onClick={handleClick(idx + 1)}
          key={`${props.currentPage}-${idx + 1}`}
          disabled={idx === props.currentPage - 1}
        >
          {idx + 1}
        </PaginationButton>
      ))}
      <PaginationButton
        className="next"
        disabled={props.currentPage === props.pageCount}
        onClick={handleClick(props.pageCount)}
      >
        <ChevronRight />
      </PaginationButton>
    </div>
  );
};

export const Pagination = styled(PaginationComponent)`
  display: flex;
`;

export const PaginationButton = styled.button`
  background-color: transparent;
  color: ${pureUiTheme.colors.black};
  border: 1px solid ${pureUiTheme.colorRoles.lightGreyBorder};
  width: 45px;
  height: 45px;
  margin: 5px;
  cursor: pointer;
  transition: all 0.15s ease-out;

  &:disabled,
  &:hover {
    border: 1px solid ${pureUiTheme.colors.black};
    cursor: default;
  }

  svg {
    font-size: 50px;
    height: 100%;
    width: 100%;
    fill: ${pureUiTheme.colors.gold};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${pureUiTheme.colors.marine};
  }

  &:active {
    box-shadow: 0 0 0 8px ${pureUiTheme.colors.lightBlue};
  }

  &.prev:disabled,
  &.next:disabled {
    opacity: 0.5;
    border-color: ${pureUiTheme.colorRoles.lightGreyBorder};
    fill: ${pureUiTheme.colorRoles.lightGreyBorder};
  }
`;
