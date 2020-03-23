import React, { useCallback } from 'react';
import Checkbox from 'pureUi/Checkbox';
import Label from 'pureUi/Label';
import RadioButton from 'pureUi/RadioButton';
import styled from 'styled-components';

export interface IThroggleProps {
  className?: string;
  name: string;
  value: boolean | null;
  onChange: (value: boolean | null) => void;
  label: string;
  trueLabel: string;
  falseLabel: string;
  disabled?: boolean;
}

export const ThroggleComponent = (props: IThroggleProps) => {
  const handleCheckboxChange = (e: React.FormEvent<HTMLInputElement>) => {
    const emitValue = e.currentTarget.checked === true ? true : null;
    props.onChange(emitValue);
  };

  const handleRadioChange = (e: React.FormEvent<HTMLInputElement>) => {
    const emitValue = e.currentTarget.value === 'true' ? true : false;
    props.onChange(emitValue);
  };

  return (
    <div className={props.className}>
      <Label lowercase className="checkbox" text={props.label} inline reverse>
        <Checkbox
          disabled={props.disabled}
          checked={props.value === true || props.value === false}
          onChange={handleCheckboxChange}
        />
      </Label>
      <Label lowercase className="trueLabel" text={props.trueLabel} inline disabled={props.value === null}>
        <RadioButton
          name={props.name}
          data-role="radioTrue"
          disabled={props.value === null}
          value="true"
          checked={props.value === true}
          onChange={handleRadioChange}
        />
      </Label>
      <Label lowercase className="falseLabel" text={props.falseLabel} inline reverse disabled={props.value === null}>
        <RadioButton
          name={props.name}
          data-role="radioFalse"
          disabled={props.value === null}
          value="false"
          checked={props.value === false}
          onChange={handleRadioChange}
        />
      </Label>
    </div>
  );
};

export const Throggle = styled(ThroggleComponent)`
  display: flex;
  outline: none;

  & > .checkbox {
    flex-grow: 1;
    width: 100%;
  }

  & > .trueLabel {
    margin-right: 10px;
    width: auto;
  }

  & > .falseLabel {
    width: auto;
    flex-shrink: 1;
  }
`;
