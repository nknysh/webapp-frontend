import React, { useState } from 'react';
import CustomItemForm, { CustomItemFormProps } from './';

const createProps = (
  overwrites: Partial<CustomItemFormProps> = {},
  setKeyVal: (key: string, val: any) => void
) => {
  const update = (key: string) => (val: any) => setKeyVal(key, val);

  return {
    data: null,
    validation: null,
    currency: '$',
    onNameChange: update('name'),
    onTotalChange: update('total'),
    onDescriptionChange: update('description'),
    onCountAsMealPlanChange: update('countAsMealPlan'),
    onCountAsTransferChange: update('countAsTransfer'),
    onShow: () => console.log('onShow'),
    onConfirm: () => console.log('onConfirm'),
    onCancel: () => console.log('onCancel'),
    ...overwrites
  };
};

const requireProp = (prop: string, obj: Object) =>
  obj && !obj[prop] ? ['Required'] : [];

export const BasicUsage = () => {
  const [state, setState] = useState<any>(null);
  
  const setKeyVal = (key: string, val: any) => setState({
    ...state,
    [key]: val
  });

  const props = createProps({
      data: state,
      onShow: () => setState({}),
      onConfirm: () => setState(null),
      onCancel: () => setState(null),
      validation: {
        name: requireProp('name', state),
        total: requireProp('total', state),
      }
    },
    setKeyVal
  );
  console.log('data', props.data, 'validation', props.validation);

  return (
    <CustomItemForm {...props}/>
  );
};
