import React from 'react';
import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

export interface IAccordianProps extends React.HTMLAttributes<HTMLDListElement> {}

export const Accordian = styled.dl`
  display: flex;
  flex-direction: column;
  border: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export interface IAccordianSectionProps extends React.HTMLAttributes<HTMLLIElement> {
  title: string;
  isOpen?: boolean;
  suffix?: string;
}

export const AccordianSectionCompoennt = (props: IAccordianSectionProps) => {
  const { children, title, isOpen, ...otherProps } = props;
  return (
    <>
      <dt title={title} {...otherProps}>
        <p className="title">{title}</p>
        <span>
          {props.suffix && <p>{props.suffix}</p>}
          {props.isOpen ? <ExpandMore /> : <ExpandLess />}
        </span>
      </dt>
      {isOpen && <AccordianContent>{children}</AccordianContent>}
    </>
  );
};

export const AccordianSection = styled(AccordianSectionCompoennt)`
  padding: 10px;
  border: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
  border-width: 1px 0 ${props => (props.isOpen ? '1px' : 0)} 0;
  display: flex;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;

  &:first-of-type {
    border-top: none;
  }

  .title {
    font-size: 14px;
  }

  & > span {
    display: flex;
  }

  p {
    margin: 0 10px 0 0;
    color: ${pureUiTheme.colorRoles.grayLabel};
    font-size: 12px;
    align-self: center;
  }
`;

export const AccordianContent = styled.dd`
  padding: 0;
  margin: 0;
`;
