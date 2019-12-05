import React, { HTMLProps, useState, useCallback, Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import MousePositionProvider from 'pureUi/MousePositionProvider';
import Tooltip from 'pureUi/Tooltip';

export interface IResultBadgeProps extends HTMLProps<HTMLSpanElement> {
  label: string;
  type: 'price' | 'offer' | 'strikethrough' | 'text';
}

const ResultBadge = (props: IResultBadgeProps) => {
  return (
    <MousePositionProvider
      className={`${props.className} ${props.type}`}
      render={mousePosition => {
        return (
          <>
            {props.label}
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

export default styled(ResultBadge)`
  padding: 0 10px;
  line-height: 35px;
  font-family: 'HurmeGeometricSans2';
  font-size: 14px;
  text-transform: uppercase;
  text-align: center;
  color: ${pureUiTheme.colors.black};
  background-color: ${pureUiTheme.colors.white};

  &.price {
    font-size: 18px;
  }

  &.text {
    font-size: 12px;
  }

  &.strikethrough {
    font-size: 18px;
    text-decoration: line-through;
    color: ${pureUiTheme.colors.goldLight};
  }

  &.offer {
    color: ${pureUiTheme.colors.redFade};
    font-weight: 600;
  }
`;
