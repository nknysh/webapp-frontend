import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { colors } from '../pureUiTheme';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  count: number;
  showZero?: boolean;
  offset?: number[]; //[x, y]
}

const Badge = (props: BadgeProps) => {
  const { className, children, count, showZero } = props;
  const toDisplay = (count || showZero) ? count : null;

  return (
    <div className={className}>
      {children}
      {toDisplay !== null && (
        <sup className="badge-indicator">{toDisplay}</sup>
      )}
    </div>
  );
};

export default styled(Badge)`
  position: relative;
  display: inline-block;

  .badge-indicator {
    display: block;
    height: 20px;
    min-width: 20px;
    line-height: 20px;
    border-radius: 10px;
    padding: 0 6px;
    font-size: 12px;
    text-align: center;
    font-weight: normal;

    position: absolute;
    top: ${props => -(props?.offset?.[1] || 0)}px;
    right: ${props => -(props?.offset?.[0] || 0)}px;
    transform: translate(50%,-50%);

    background-color: ${colors.redFade};
    color: ${colors.white};
  }

`;
