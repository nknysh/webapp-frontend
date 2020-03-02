import React, { HTMLProps, useCallback, useState } from 'react';
import styled from 'styled-components';
import { pureUiTheme } from '../pureUiTheme';
import { ChevronRight, ChevronLeft, ArrowUpward } from '@material-ui/icons';
import { DimensionsProvider, IDimensions } from 'pureUi/DimensionsProvider';
import { IViewportDimensions } from 'hooks/useWindowSize';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { IconButton } from '../Buttons/index';

const buttonSize = 45;
const buttonMargin = 5;

export const getStartIdex = (currentPage: number, totalPages: number, maxItems: number): number => {
  const remainingPages = totalPages - currentPage;

  if (currentPage >= maxItems && remainingPages >= maxItems) {
    return currentPage - Math.floor(maxItems / 2) - 1;
  }

  if (currentPage >= maxItems && remainingPages <= maxItems) {
    return totalPages - maxItems;
  }

  return 0;
};

export interface IPaginationProps extends HTMLProps<HTMLDivElement> {
  pageCount: number;
  currentPage: number;
  onPageSelect: (pageNumber: number) => void;
}
export const PaginationComponent = (props: IPaginationProps) => {
  const [showAll, setShowAll] = useState(false);

  const handleClick = useCallback(
    (pageNumber: number) => () => {
      setShowAll(false);
      props.onPageSelect(pageNumber);
    },
    [props.pageCount]
  );

  const toggleShowAll = useCallback(() => {
    setShowAll(!showAll);
  }, [showAll]);

  return (
    <div className={props.className}>
      <PaginationButton
        data-role="prev page button"
        title={`Previous page`}
        className="prev"
        disabled={props.currentPage === 1}
        onClick={handleClick(props.currentPage - 1)}
      >
        <ChevronLeft />
      </PaginationButton>

      {showAll && (
        <div className="dynamicButtons">
          {Array.from({ length: props.pageCount }).map((_, idx: number) => (
            <PaginationButton
              data-role="page button"
              title={`Go to page ${idx + 1}`}
              onClick={handleClick(idx + 1)}
              key={`${props.currentPage}-${idx + 1}`}
              disabled={idx === props.currentPage - 1}
            >
              {idx + 1}
            </PaginationButton>
          ))}
          {showAll && (
            <IconButton data-role="show less button" title="Show Less" onClick={toggleShowAll} className="showAll">
              <ArrowUpwardIcon />
            </IconButton>
          )}
        </div>
      )}

      {!showAll && (
        <DimensionsProvider
          display="flex"
          render={(ancestorDimensions: IDimensions, viewportDimensions: IViewportDimensions) => {
            // Rendering based on measurements is tricky and messy. We need to trick the browser
            // into updating bounding boxes before we can use those measurement. That's what this
            // condition is doing. the `preMeasure` class is an atempt to minimise
            if (!ancestorDimensions) {
              return (
                <div className="dynamicButtons preMeasure">
                  {Array.from({ length: props.pageCount }).map((_, idx: number) => (
                    <PaginationButton
                      data-role="page button"
                      title={`Go to page ${idx + 1}`}
                      onClick={handleClick(idx + 1)}
                      key={`${props.currentPage}-${idx + 1}`}
                      disabled={idx === props.currentPage - 1}
                    >
                      {idx + 1}
                    </PaginationButton>
                  ))}
                </div>
              );
            }

            const buttonAbsoluteSize = buttonMargin * 2 + buttonSize;
            const maxItems = Math.floor(ancestorDimensions.width / buttonAbsoluteSize);
            const buttonCount = maxItems < props.pageCount ? maxItems - 1 : props.pageCount;
            const startIndex = getStartIdex(props.currentPage, props.pageCount, maxItems);

            return (
              <div className="dynamicButtons">
                {Array.from({ length: buttonCount }).map((_, idx: number) => (
                  <PaginationButton
                    data-role="page button"
                    title={`Go to page ${startIndex + idx + 1}`}
                    onClick={handleClick(startIndex + idx + 1)}
                    key={`${props.currentPage}-${startIndex + idx + 1}`}
                    disabled={startIndex + idx === props.currentPage - 1}
                  >
                    {startIndex + idx + 1}
                  </PaginationButton>
                ))}
                {props.pageCount > maxItems && (
                  <PaginationButton data-role="show all button" onClick={toggleShowAll} className="showAll">
                    ...
                  </PaginationButton>
                )}
              </div>
            );
          }}
        />
      )}

      <PaginationButton
        data-role="next page button"
        title="Next Page"
        className="next"
        disabled={props.currentPage === props.pageCount}
        onClick={handleClick(props.currentPage + 1)}
      >
        <ChevronRight />
      </PaginationButton>
    </div>
  );
};

export const Pagination = styled(PaginationComponent)`
  display: flex;

  .dynamicButtons {
    flex-grow: 2;
  }

  .preMeasure {
    height: 50px;
    overflow: hidden;
  }
`;

export const PaginationButton = styled.button`
  background-color: transparent;
  color: ${pureUiTheme.colors.black};
  border: 1px solid ${pureUiTheme.colorRoles.lightGreyBorder};
  width: ${buttonSize}px;
  height: ${buttonSize}px;
  margin: ${buttonMargin}px;
  cursor: pointer;
  transition: all 0.15s ease-out;

  &:disabled,
  &:hover {
    border: 1px solid ${pureUiTheme.colors.black};
    cursor: default;
  }

  svg {
    font-size: 25px;
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

  &.prev,
  &.next {
    min-width: ${buttonSize}px;
  }

  &.prev:disabled,
  &.next:disabled {
    opacity: 0.5;
    border-color: ${pureUiTheme.colorRoles.lightGreyBorder};
    fill: ${pureUiTheme.colorRoles.lightGreyBorder};
  }
`;
