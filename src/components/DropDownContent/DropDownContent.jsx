import React, { useState, useContext } from 'react';
import { isNil } from 'ramda';
import { isFunction } from 'utils';

import { DropDownContentContentContext } from './DropDownContent.context';
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

const renderChildren = (children, isCurrentContext, showArea) =>
  children &&
  isCurrentContext &&
  showArea && <DropDownContentArea>{isFunction(children) ? children() : children}</DropDownContentArea>;

export const DropDownContent = ({
  showOverlay,
  showRawInput,
  overlayProps,
  inputContent,
  maskProps,
  showArrow,
  inputProps,
  onChange,
  children,
  showContent,
  onClick,
  id,
}) => {
  const [showArea, setShowContent] = useState(showContent);

  const onInputClick = e => {
    if (onClick) onClick(e);
    setShowContent(!showArea);
  };

  const currentContext = useContext(DropDownContentContentContext);
  const isCurrentContext = !isNil(currentContext) && currentContext === id;

  const shouldShow = !isNil(showContent) ? showContent : showArea;

  return (
    <StyledDropDownContent>
      <DropDownContentInputWrapper>
        {renderOverlay(showOverlay, overlayProps)}
        {!showRawInput && renderInputMask(inputContent, maskProps, showArrow)}
        {renderInput({ showRawInput, onChange, onClick: onInputClick, ...inputProps })}
      </DropDownContentInputWrapper>
      {renderChildren(children, isCurrentContext, shouldShow)}
    </StyledDropDownContent>
  );
};

DropDownContent.propTypes = propTypes;
DropDownContent.defaultProps = defaultProps;

export default DropDownContent;
