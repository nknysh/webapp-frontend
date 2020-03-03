import React, { Fragment, useState } from 'react';

import { TextInput } from './';
import Label from 'pureUi/Label';

export const AllTextInputs = () => {
  const [textValue, setTextValue] = useState('I am text');
  const [numValue, setNumValue] = useState(123);

  const handleNumChange = value => {
    if (!isNaN(value) || value === '.') {
      setNumValue(value);
    }
  };

  return (
    <Fragment>
      <Label text="Text Input">
        <TextInput
          value={textValue}
          onChange={e => {
            setTextValue(e.currentTarget.value);
          }}
        />
      </Label>
      <br />
      <Label text="Numeric">
        <TextInput
          inputmode="numeric"
          pattern="[0-9]*"
          value={numValue}
          onChange={e => {
            handleNumChange(e.currentTarget.value);
          }}
        />
      </Label>
    </Fragment>
  );
};
