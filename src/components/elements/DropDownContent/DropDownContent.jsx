import React, { useState } from 'react';
import { isNil } from 'ramda';
import { ClickAwayListener } from '@material-ui/core';

import { useKeyboard } from 'effects';
import { isFunction, noop } from 'utils';

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
  children,
  closeOnClickAway,
  contentOnly,
  inputContent,
  inputProps,
  keepOpen,
  maskProps,
  onChange,
  onClick,
  overlayProps,
  showArrow,
  showContent,
  showInput,
  showOverlay,
  showRawInput,
}) => {
  const [showArea, setShowArea] = useState(showContent || false);

  const onClose = () => setShowArea(false);

  useKeyboard(27, onClose);

  const renderChildren = () => (
    <DropDownContentArea data-content={contentOnly}>{isFunction(children) ? children() : children}</DropDownContentArea>
  );

  if (contentOnly) return renderChildren();

  const shouldShow = !isNil(showContent) ? showContent : showArea;
  const shouldRenderChildren = keepOpen || (Boolean(children) && showArea && shouldShow);
  const onInputClick = e => {
    if (onClick) onClick(e);
    setShowArea(!showArea);
  };

  return (
    <ClickAwayListener onClickAway={closeOnClickAway ? onClose : noop}>
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
