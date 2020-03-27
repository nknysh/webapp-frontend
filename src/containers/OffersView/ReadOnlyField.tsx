import React from 'react';
import styled from 'styled-components';

export const _ReadOnlyField = props => {
  const { label, children, className } = props;
  return (
    <div className={className}>
      <label className="primary">{label}</label>
      {children}
    </div>
  );
};
export const ReadOnlyField = styled(_ReadOnlyField)`
  border: 1px solid #cbd5e0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 8px;
  margin-bottom: 16px;
  &:last-of-type {
    margin-bottom: 0px;
  }
  div {
    margin-bottom: 16px;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
  label {
    display: block;
    color: #4a5568;
    margin-bottom: 4px;
    &.primary {
      font-size: 12px;
      color: #4a5568;
      margin-bottom: 8px;
    }
  }
`;
