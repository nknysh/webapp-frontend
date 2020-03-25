import React, { Fragment, FormEvent } from 'react';
import styled from 'styled-components';
import { CustomItemPayload } from 'services/BackendApi';

import { ActionButton } from '../Buttons';
import Label from '../Label';
import TextInput from '../TextInput';
import Checkbox from '../Checkbox';

export interface CustomItemFormProps {
  className?: string;
  data: CustomItemPayload | null;
  onNameChange: (string) => void;
  onDescriptionChange: (string) => void;
  onCountAsMealPlanChange: (boolean) => void;
}

const Wrapper = styled.div``;

const FormItem = styled.div`
  margin: 10px 0;
`;

const eventValueSelector = (handler: (any) => void) =>
  (e: FormEvent<HTMLInputElement>) => handler(e.currentTarget.value);

const eventCheckedSelector = (handler: (any) => void) =>
  (e: FormEvent<HTMLInputElement>) => handler(e.currentTarget.checked);

const CustomItemForm = (props: CustomItemFormProps) => {
  const {
    className,
    data,
    onNameChange,
    onDescriptionChange,
    onCountAsMealPlanChange
  } = props;

  return (
    <Wrapper className={className}>
      {!!data
        ? (
          <Fragment>
            <FormItem>
              <Label lowercase text="Name">
                <TextInput
                  value={data.name}
                  onChange={eventValueSelector(onNameChange)}
                  placeholder="Name"
                />
              </Label>
            </FormItem>
            <FormItem>
              <Label lowercase text="Description">
                <TextInput
                  value={data.description}
                  onChange={eventValueSelector(onDescriptionChange)}
                  placeholder="Name"
                />
              </Label>
            </FormItem>
            <FormItem>
              <Label lowercase inline reverse text="This item replaces Meal Plans">
              <Checkbox
                checked={data.countsAsMealPlan}
                onChange={eventCheckedSelector(onCountAsMealPlanChange)}
              />
            </Label>
            </FormItem>
          </Fragment>
        )
        : (
          <ActionButton action="add">
            Add Custom Item
          </ActionButton>
        )
      }
    </Wrapper>
  );
}


export default CustomItemForm;