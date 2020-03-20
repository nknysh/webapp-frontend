import React from 'react';
import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import { HTMLAttributes } from 'react';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
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
  font-family: ${props => headingFont(props.level)};
  color: ${props => headingColor(props.level)};
  font-weight: ${props => headingWeight(props.level)};
`;

export const Text = styled.p`
  color: ${pureUiTheme.colors.grayDarker};
  padding: 0;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 10px;
`;

const headingFont = (level: HeadingLevel) => {
  switch (level) {
    case 'h1':
    case 'h2':
      return pureUiTheme.typography.serifFont;
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return pureUiTheme.typography.sansSerifFont;
  }
};

const headingColor = (level: HeadingLevel) => {
  switch (level) {
    case 'h1':
      return pureUiTheme.colors.gold;
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return pureUiTheme.colors.grayDark;
  }
};

const headingWeight = (level: HeadingLevel) => {
  switch (level) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return `${pureUiTheme.typography.bolder}`;
  }
};
