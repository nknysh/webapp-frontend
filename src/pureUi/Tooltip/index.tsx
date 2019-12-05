import React from 'react';
import ReactDOM from 'react-dom';
import { HTMLProps } from 'react';
import styled, { keyframes } from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export interface TooltipPosition {
  x: number;
  y: number;
}

export interface ITooltipProps extends HTMLProps<HTMLDivElement> {
  position: TooltipPosition;
}

const tooltipIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default styled.div.attrs<ITooltipProps>(props => ({
  style: {
    top: `${props.position.y + 10}px`,
    left: `${props.position.x + 10}px`,
  },
}))`
  /* 
    Position fixed with a z-index of 1 seems to do just as well
    at keeping tooltips rendering above all other content without
    the need for a Portal. 
  */
  position: fixed;
  z-index: 1;
  max-width: 300px;
  color: ${pureUiTheme.colors.black};
  background-color: ${pureUiTheme.colorRoles.areaBackground};
  border: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
  box-shadow: 0 1px 2px ${pureUiTheme.colors.grayOpacity1};
  font-weight: normal;
  font-size: 12px;
  animation: ${tooltipIn} 0.25s ease-out;
`;
