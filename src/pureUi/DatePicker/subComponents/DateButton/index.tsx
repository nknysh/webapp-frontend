// DateButton
// Styled Components & Typescript help...
// https://github.com/styled-components/styled-components/blob/master/docs/typescript-support.md

import * as classNames from 'classnames';
import * as React from 'react';
import { IDateObject } from '../../types';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import styled from 'styled-components';

interface IDateButtonProps {
  className?: string;
  dateObject: IDateObject;
  onClick?: (dateString: string) => any;
  onMouseOver?: (dateString: string) => any;
  isSelected?: boolean;
  isDisabled?: boolean;
  isExtra?: boolean;
  isFirstDate?: boolean;
}

class DateButton extends React.Component<IDateButtonProps, {}> {
  private onClickHandler = () => {
    this.props.onClick && this.props.onClick(this.props.dateObject.dateString);
  };

  private onMouseOverHandler = () => {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(this.props.dateObject.dateString);
    }
  };

  public render() {
    const classes = classNames(this.props.className, {
      isSelected: this.props.isSelected,
      isDisabled: this.props.isDisabled,
      isFirstDate: this.props.isFirstDate,
      isExtra: this.props.isExtra,
    });

    return (
      <button
        className={classes}
        onClick={this.onClickHandler}
        onMouseOver={this.onMouseOverHandler}
        disabled={this.props.isDisabled}
      >
        {this.props.dateObject.date}
      </button>
    );
  }
}

const StyledDateButton = styled(DateButton)`
  cursor: pointer;
  position: relative;
  text-align: center;
  padding: 5px;
  border: none;
  background-color: transparent;
  color: ${pureUiTheme.colors.blackLight};
  font-size: 12px;
  font-weight: bold;
  line-height: 32px;

  &:hover,
  &.isSelected,
  &.isExtra:hover {
    background-color: ${pureUiTheme.colors.aqua};
  }

  &.isExtra {
    color: ${pureUiTheme.colors.grayDark};
  }

  &.isSelected {
    background-color: ${pureUiTheme.colors.aqua};
  }

  &:focus {
    outline: none;
  }
`;

export default StyledDateButton;
