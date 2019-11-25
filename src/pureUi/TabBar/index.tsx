import React, { HTMLProps, ReactNode, useCallback, FormEvent } from 'react';
import styled from 'styled-components';
import { IconButton } from '../Buttons/index';
import { Icon } from '@material-ui/core';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export interface TabBarCompactProps extends HTMLProps<HTMLDivElement> {
  tabIndex: number;
  children: ReactNode[];
  onIncrementTabIndex: (step: number) => void;
}
const TabBarCompactComponent = (props: TabBarCompactProps) => {
  const handleIncrement = useCallback(
    (step: number) => (e: FormEvent<HTMLButtonElement>): void => {
      props.onIncrementTabIndex(step);
    },
    [props.onIncrementTabIndex]
  );

  return (
    <div className={props.className}>
      {props.tabIndex > 0 && (
        <IconButton className="prevButton" title="previous tab" onClick={handleIncrement(-1)}>
          <Icon>chevron_left</Icon>
        </IconButton>
      )}
      {props.tabIndex < props.children.length - 1 && (
        <IconButton className="nextButton" title="next tab" onClick={handleIncrement(1)}>
          <Icon>chevron_right</Icon>
        </IconButton>
      )}

      <div className="children">{props.children[props.tabIndex]}</div>
    </div>
  );
};

export const TabBarCompact = styled(TabBarCompactComponent)`
  display: grid;
  grid-template-areas: 'prev children next';
  grid-template-columns: 50px 1fr 50px;
  border-bottom: ${pureUiTheme.colors.gold} 1px solid;
  background-color: ${pureUiTheme.colors.whiteish};
  user-select: none;

  .prevButton {
    grid-area: prev;
    text-align: right;
  }
  .nextButton {
    grid-area: next;
    text-align: left;
  }

  .children {
    display: flex;
    flex-direction: column;
    grid-area: children;
  }
`;
