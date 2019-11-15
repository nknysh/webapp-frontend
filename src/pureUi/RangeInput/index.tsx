import React from 'react';

export type RangeValueType = 'min' | 'max';

export interface RangeInputProps {
  title: string;
  min: string;
  max: string;
  onChange: (type: RangeValueType, value: string) => void;
}
export const RangeInput = (props: RangeInputProps) => {
  const handleChange = (type: RangeValueType) => (e: React.FormEvent<HTMLInputElement>) => {
    props.onChange(type, e.currentTarget.value);
  };
  return (
    <div>
      <h3>{props.title}</h3>
      <div className="inputs">
        <label>
          Min <input title="min value" type="text" value={props.min} onChange={handleChange('min')} />
        </label>
        <label>
          Max <input title="max value" type="text" value={props.max} onChange={handleChange('max')} />
        </label>
      </div>
      {props.min > props.max && <p>Max must be greater than min</p>}
    </div>
  );
};
