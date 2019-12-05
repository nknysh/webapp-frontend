import React, { HTMLProps } from 'react';
import styled from 'styled-components';
import { Icon } from '@material-ui/core';
import MousePositionProvider from 'pureUi/MousePositionProvider';
import Tooltip from 'pureUi/Tooltip';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export interface IInfoProps extends HTMLProps<HTMLSpanElement> {}

const Info = (props: IInfoProps) => {
  return (
    <MousePositionProvider
      className={`${props.className} ${props.type}`}
      render={mousePosition => {
        return (
          <>
            <Icon>info</Icon>
            {/* 
            // @ts-ignore */}
            {props.children && mousePosition.isOver && <Tooltip position={mousePosition}>{props.children}</Tooltip>}
            {/* TODO: Figure out cause and fix for the TS error above */}
          </>
        );
      }}
    />
  );
};

export default styled(Info)`
  .material-icons {
    font-size: inherit;
    color: inherit;
  }
`;
