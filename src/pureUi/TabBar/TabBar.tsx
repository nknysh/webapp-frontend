import React, { HTMLProps, ReactNode, useCallback, FormEvent } from 'react';
import styled from 'styled-components';
import { IconButton } from '../Buttons/index';
import { Icon } from '@material-ui/core';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import { NavLink, LinkProps } from 'react-router-dom';

export const TabBar = styled.div`
  display: flex;
  border-bottom: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
  margin-bottom: 20px;
`;

export interface IRouteTabProps extends LinkProps {}

export const RouteTabComponent = (props: IRouteTabProps) => {
  const { children, className, ...linkProps } = props;
  return (
    <NavLink className={props.className} activeClassName="active" {...linkProps}>
      {/** This span allows us to override the global styles that apply to links */}
      <span>{children}</span>
    </NavLink>
  );
};

export const RouteTab = styled(RouteTabComponent)`
  padding: 20px;

  span {
    font-family: 'HurmeGeometricSans2';
    text-transform: uppercase;
    font-size: 13px;
    color: ${pureUiTheme.colors.blackLight};
  }

  &.active span {
    color: ${pureUiTheme.colors.black};
  }

  &.active {
    border-bottom: ${pureUiTheme.colors.goldBorder} 2px solid;
  }
`;
