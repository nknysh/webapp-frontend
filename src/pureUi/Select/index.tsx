import React from 'react';
import { IValueLabelPair } from '../../interfaces';
import styled from 'styled-components';

const StyledSelect = styled.select`
  width: 100%;
  font-family: HurmeGeometricSans2, 'Open Sans', sans-serif !important;
  padding: 10px;
  text-transform: uppercase;
  display: block;
  border: 1px solid #e0e0e0;
  color: #373c46;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  appearance: none;
  border-radius: 0;
`;

const Select = ({
  value,
  options,
  onChange,
  className,
}: {
  value: string;
  options: IValueLabelPair[];
  onChange: Function;
  className?: string;
}) => {
  return (
    <StyledSelect
      className={className || ''}
      value={value}
      onChange={e => {
        if (e.target.value === 'null') {
          return onChange({
            target: {
              value: null,
            },
          });
        }
        return onChange(e);
      }}
    >
      {options &&
        options.map(option => {
          if (option.value === null) {
            return (
              <option key={`${option.value}-${option.label}`} value={'null'} disabled={option.disabled}>
                {option.label}
              </option>
            );
          }
          return (
            <option key={`${option.value}-${option.label}`} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          );
        })}
    </StyledSelect>
  );
};

export default Select;
