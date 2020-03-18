import React, { useState } from 'react';
import { Throggle } from './';

export const ThroggleBasicUsage = () => {
  const [value, setValue] = useState<boolean | null>(null);

  const handleSetValue = (newValue: typeof value) => {
    setValue(newValue);
  };

  return (
    <Throggle
      name="basic"
      value={value}
      onChange={handleSetValue}
      label="Wings"
      trueLabel="Stay on"
      falseLabel="Fall  Off"
    />
  );
};
