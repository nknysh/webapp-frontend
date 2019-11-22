import React, { useCallback, FocusEvent } from 'react';
import styled from 'styled-components';
import TextInput, { TextInputProps } from 'pureUi/TextInput';
import { Frame } from 'pureUi/Frame';
import { List } from 'pureUi/List';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export interface PredictiveTextInputProps extends TextInputProps {
  options: string[][];
  onOptionSelect: (value: string) => void;
  showDropDown: boolean;
}

const PredictiveTextInput = (props: PredictiveTextInputProps) => {
  const { options, onOptionSelect, showDropDown, ...textInputProps } = props;
  const handleOptionSelect = useCallback((value: string) => () => props.onOptionSelect(value), [props.onOptionSelect]);

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      console.log(e);
      console.log('handleBlur', e.relatedTarget);
    },
    [onOptionSelect]
  );

  return (
    // A bug I raised in styled-compoenents years ago still appears to be an
    // issue today with no apparent fix.
    // https://github.com/styled-components/styled-components/issues/824
    // @ts-ignore
    <TextInput onBlur={handleBlur} className={props.className} {...textInputProps}>
      {!props.showDropDown || !props.options.length ? null : (
        <Frame className="dropDown">
          {props.options.map(group => (
            <List
              className="listGroup"
              items={group}
              render={item => {
                return (
                  <li key={item} tabIndex={0} onMouseDown={handleOptionSelect(item)} className="listGroupItem">
                    {item}
                  </li>
                );
              }}
            />
          ))}
        </Frame>
      )}
    </TextInput>
  );
};

export default styled(PredictiveTextInput)`
  .dropDown {
    max-height: 50vh;
    overflow: auto;
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 100%;
    z-index: 1;
  }

  .listGroup {
    padding: 0;
    list-style: none;
    margin: 0;
    border-bottom: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;

    &:last-of-type {
      border: none;
    }
  }

  .listGroupItem {
    padding: 20px 10px;
    text-transform: uppercase;
    color: ${pureUiTheme.colors.black};
    font-size: 14px;

    &:hover {
      cursor: pointer;
      background-color: ${pureUiTheme.colors.lightBlue};
    }
  }
`;
