import React, { Fragment, useCallback } from 'react';
import styled from 'styled-components';
import { CustomItemPayload } from 'services/BackendApi';

import { ActionButton, PrimaryButton, SecondaryButton } from '../Buttons';
import Label from '../Label';
import TextInput from '../TextInput';
import TextArea from '../Textarea';
import Checkbox from '../Checkbox';

import { eventValueSelector, eventCheckedSelector, sanitizeDecimal } from './form';

export interface CustomItemValidation {
  name?: String[];
  total?: String[];
  description?: String[];
  countsAsMealPlan?: String[];
  countsAsTransfer?: String[];
}

export interface CustomItemFormProps {
  className?: string;
  data: CustomItemPayload | null;
  validation?: CustomItemValidation | null;
  currency: string;
  onShow: () => void;
  onNameChange: (string) => void;
  onTotalChange: (string) => void;
  onDescriptionChange: (string) => void;
  onCountAsMealPlanChange: (boolean) => void;
  onCountAsTransferChange: (boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const Wrapper = styled.div``;

const FormItem = styled.div`
  margin: 10px 0;
`;

const Controls = styled.div`
  display: flex;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  margin-left: 10px;
`;

const CustomItemForm = (props: CustomItemFormProps) => {
  const { className, data, currency, validation } = props;
  const isValid = !validation || Object.keys(validation).every(k => !validation[k].length);

  const onNameChange = useCallback(
    eventValueSelector(props.onNameChange),
    [props.onNameChange]
  );
  const onTotalChange = useCallback(
    eventValueSelector(props.onTotalChange, sanitizeDecimal(2)),
    [props.onTotalChange]
  );
  const onDescriptionChange = useCallback(
    eventValueSelector(props.onDescriptionChange),
    [props.onDescriptionChange]
  );
  const onCountAsMealPlanChange = useCallback(
    eventCheckedSelector(props.onCountAsMealPlanChange),
    [props.onCountAsMealPlanChange]
  );
  const onCountAsTransferChange = useCallback(
    eventCheckedSelector(props.onCountAsTransferChange),
    [props.onCountAsTransferChange]
  );

  return (
    <Wrapper className={className}>
      {!!data
        ? (
          <Fragment>
            <FormItem>
              <Label lowercase text="Name">
                <TextInput
                  name="name"
                  value={data.name}
                  onChange={onNameChange}
                  placeholder="Name"
                />
              </Label>
            </FormItem>
            <FormItem>
              <Label lowercase text={`Total ${currency}`}>
                <TextInput
                  name="total"
                  value={data.total}
                  onChange={onTotalChange}
                  placeholder="Total"
                  inputmode="decimal"
                  type="number"
                />
              </Label>
            </FormItem>
            <FormItem>
              <Label lowercase text="Description">
                <TextArea
                  name="description"
                  value={data.description}
                  onChange={onDescriptionChange}
                />
              </Label>
            </FormItem>
            <FormItem>
              <Label lowercase inline reverse text="This item replaces Meal Plans">
                <Checkbox
                  name="countsAsMealPlan"
                  checked={data.countsAsMealPlan}
                  onChange={onCountAsMealPlanChange}
                />
              </Label>
            </FormItem>
            <FormItem>
              <Label lowercase inline reverse text="This item replaces Transfers">
                <Checkbox
                  name="countsAsTransfer"
                  checked={data.countsAsTransfer}
                  onChange={onCountAsTransferChange}
                />
              </Label>
            </FormItem>
            <Controls>
              <SecondaryButton name="cancel" onClick={props.onCancel}>Cancel</SecondaryButton>
              <StyledPrimaryButton name="confirm" onClick={props.onConfirm} disabled={!isValid}>Save</StyledPrimaryButton>
            </Controls>
          </Fragment>
        )
        : (
          <ActionButton action="add" onClick={props.onShow}>
            Add Custom Item
          </ActionButton>
        )
      }
    </Wrapper>
  );
}


export default CustomItemForm;