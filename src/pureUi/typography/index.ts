import React from 'react';
import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import { HTMLAttributes } from 'react';

export interface IHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const HeadingComponent = (props: IHeadingProps) => {
  const { level, ...headingProps } = props;
  return React.createElement(level, headingProps);
};

export const Heading = styled(HeadingComponent)`
  color: inherit;
  margin: 0;
`;

export const Text = styled.p`
  color: ${pureUiTheme.colors.grayDarker};
  padding: 0;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 10px;
`;
