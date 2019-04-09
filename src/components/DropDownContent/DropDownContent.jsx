import React, { useState } from 'react';
import { isNil } from 'ramda';
import { ClickAwayListener } from '@material-ui/core';

import { useKeyboard } from 'effects';
import { isFunction } from 'utils';

import { propTypes, defaultProps } from './DropDownContent.props';
import {
  StyledDropDownContent,
  DropDownContentArea,
  DropDownContentOverlay,
  DropDownContentInputWrapper,
  DropDownContentInput,
  DropDownContentMask,
  DropDownContentIcon,
} from './DropDownContent.styles';

const renderOverlay = (showOverlay, overlayProps) => showOverlay && <DropDownContentOverlay {...overlayProps} />;

const renderInputMask = (inputContent, maskProps, showArrow) => (
  <DropDownContentMask {...maskProps}>
    {inputContent && isFunction(inputContent) ? inputContent() : inputContent}
    {showArrow && <DropDownContentIcon>arrow_drop_down</DropDownContentIcon>}
  </DropDownContentMask>
);

const renderInput = inputProps => <DropDownContentInput {...inputProps} />;

export const DropDownContent = ({
  showOverlay,
  showRawInput,
  showInput,
  overlayProps,
  inputContent,
  maskProps,
  showArrow,
  inputProps,
  onChange,
  children,
  showContent,
  keepOpen,
  onClick,
  contentOnly,
}) => {
  const renderChildren = () => (
    <DropDownContentArea data-content={contentOnly}>{isFunction(children) ? children() : children}</DropDownContentArea>
  );

  if (contentOnly) return renderChildren();

  const [showArea, setShowArea] = useState(showContent || false);

  const shouldShow = !isNil(showContent) ? showContent : showArea;
  const shouldRenderChildren = keepOpen || (Boolean(children) && showArea && shouldShow);

  const onClose = () => setShowArea(false);
  const onInputClick = e => {
    if (onClick) onClick(e);
    setShowArea(!showArea);
  };

  useKeyboard(27, onClose);

  return (
    <ClickAwayListener onClickAway={onClose}>
      <StyledDropDownContent>
        <DropDownContentInputWrapper>
          {renderOverlay(showOverlay, overlayProps)}
          {!showRawInput && renderInputMask(inputContent, maskProps, showArrow)}
          {showInput && renderInput({ showRawInput, onChange, onClick: onInputClick, ...inputProps })}
        </DropDownContentInputWrapper>
        {shouldRenderChildren && renderChildren()}
      </StyledDropDownContent>
    </ClickAwayListener>
  );
};

DropDownContent.propTypes = propTypes;
DropDownContent.defaultProps = defaultProps;

export default DropDownContent;
