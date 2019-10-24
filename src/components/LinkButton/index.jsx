import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { theme } from 'styles';

// Why LinkButton?
// Semantically, a link takes the user somewhere else. A button performs
// an action in situ, or dispatch events. But since designers keep making
// buttons look like links, we need "LinkButton"!

export const LinkButton = props => {
  const { children, ...buttonProps } = props;
  return (
    <button {...buttonProps}>
      <div>{children}</div>
    </button>
  );
};

LinkButton.propTypes = {
  title: PropTypes.string.isRequired,
};

export default styled(LinkButton)`
  border: none;
  background: transparent;
  color: ${theme.palette.primary};
  font-family: inherit;
  font-size: inherit;
  font-weight: ${theme.fonts.bold};
  text-transform: uppercase;
  padding-left: 0;
  text-align: left;
  cursor: pointer;
  max-width: 100%;

  &:active {
    color: ${theme.palette.light};
  }

  &:focus {
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
  }

  & > div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;
