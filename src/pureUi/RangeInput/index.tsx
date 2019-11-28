import React from 'react';
import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import TextInput from 'pureUi/TextInput';

// TODO: Figure out why the Typescirpt is sayin the onChange event doesn't exisit on an input
export type RangeValueType = 'min' | 'max';

export interface RangeInputProps {
  className?: string;
  min: string;
  max: string;
  onChange: (type: RangeValueType, value: string) => void;
}
export const RangeInput = (props: RangeInputProps) => {
  const handleChange = (type: RangeValueType) => (e: React.FormEvent<HTMLInputElement>) => {
    props.onChange(type, e.currentTarget.value);
  };

  return (
    <div className={props.className}>
      <div className="inputs">
        <label>
          Min{' '}
          <TextInput className="input" name="min value" type="text" value={props.min} onChange={handleChange('min')} />
        </label>
        <label>
          Max{' '}
          <TextInput className="input" name="max value" type="text" value={props.max} onChange={handleChange('max')} />
        </label>
      </div>
      <p className="error">
        {parseFloat(props.min) > parseFloat(props.max) ? 'Max must be greater than min' : '\u00A0'}
      </p>
    </div>
  );
};

export default styled(RangeInput)`
  .inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;

    .input {
      margin-top: 10px;
      display: block;
    }
  }

  .error {
    color: ${pureUiTheme.colorRoles.error};
  }
`;
