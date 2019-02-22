// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';

// App
import { colors } from 'styles';

// Components
import Styled from '../Styled';

const Item = Styled.H8.extend`
  flex: 1;
  padding-vertical: 6px;
  padding-horizontal: 10px;
  background-color: ${props => (props.highlighted ? 'lightgray' : 'white')};
`;

// NOTE(mark): Use setFieldValue with onChange and setFieldTouched with onBlur.
const SelectInput = ({ name, placeholder, value, options, onChange, onBlur, style, Input }) => (
  <Downshift
    defaultInputValue={value}
    onChange={selected => onChange(name, selected.value)}
    itemToString={option => (option ? option.label : '')}
  >
    {({ getInputProps, getItemProps, getMenuProps, isOpen, highlightedIndex, openMenu, selectedItem }) => (
      <div style={{ position: 'relative' }}>
        <Input
          {...getInputProps({
            name,
            placeholder,
            onFocus: openMenu,
            onBlur: event => onBlur(name, selectedItem, event),
            style,
          })}
        />
        <div
          {...getMenuProps()}
          style={
            isOpen
              ? {
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  zIndex: 100,
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: colors.gray14,
                }
              : null
          }
        >
          {isOpen
            ? options.map((option, index) => (
                <div
                  {...getItemProps({
                    key: option.value,
                    index,
                    item: option,
                  })}
                  style={{ display: 'flex' }}
                >
                  <Item highlighted={highlightedIndex === index} selected={selectedItem === option}>
                    {option.label}
                  </Item>
                </div>
              ))
            : null}
        </div>
      </div>
    )}
  </Downshift>
);

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  Input: PropTypes.func.isRequired,
};

SelectInput.defaultProps = {};

export default SelectInput;
