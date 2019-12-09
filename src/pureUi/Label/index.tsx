import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: block;
  text-transform: uppercase;
`;

const Label = ({ className, children }: { className?: string; children: any }) => {
  return <StyledLabel className={className || ''}>{children}</StyledLabel>;
};

export default Label;
