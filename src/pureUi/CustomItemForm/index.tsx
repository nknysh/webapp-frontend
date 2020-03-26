import React, { Fragment } from 'react';
import styled from 'styled-components';
import { CustomItemPayload } from 'services/BackendApi';

import { ActionButton, PrimaryButton, SecondaryButton } from '../Buttons';
import Label from '../Label';
import TextInput from '../TextInput';
import TextArea from '../Textarea';
import Checkbox from '../Checkbox';

import { eventValueSelector, eventCheckedSelector } from './form';
import { sanitizeDecimal } from './format';

export interface CustomItemFormProps {
  className?: string;
  data: CustomItemPayload | null;
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
  const { className, data, currency } = props;

  return (
    <Wrapper className={className}>
      {!!data
        ? (
          <Fragment>
            <FormItem>
              <Label lowercase text="Name">
                <TextInput
                  value={data.name}
                  onChange={eventValueSelector(props.onNameChange)}
                  placeholder="Name"
                />
              </Label>
            </FormItem>
            <FormItem>
              <Label lowercase text={`Total ${currency}`}>
                <TextInput
                  value={data.total}
                  onChange={eventValueSelector(props.onTotalChange, sanitizeDecimal)}
                  placeholder="Total"
                  inputmode="decimal"
                  type="number"
                />
              </Label>
            </FormItem>
            <FormItem>
              <Label lowercase text="Description">
                <TextArea
                  value={data.description}
                  onChange={eventValueSelector(props.onDescriptionChange)}
                />
              </Label>
            </FormItem>
            <FormItem>
              <Label lowercase inline reverse text="This item replaces Meal Plans">
                <Checkbox
                  checked={data.countsAsMealPlan}
                  onChange={eventCheckedSelector(props.onCountAsMealPlanChange)}
                />
              </Label>
            </FormItem>
            <FormItem>
              <Label lowercase inline reverse text="This item replaces Transfers">
                <Checkbox
                  checked={data.countsAsTransfer}
                  onChange={eventCheckedSelector(props.onCountAsTransferChange)}
                />
              </Label>
            </FormItem>
            <Controls>
              <SecondaryButton onClick={props.onCancel}>Cancel</SecondaryButton>
              <StyledPrimaryButton onClick={props.onConfirm}>Save</StyledPrimaryButton>
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