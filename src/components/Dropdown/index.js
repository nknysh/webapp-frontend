// Libraries
import React from 'react';
import Downshift from 'downshift';

// App
import { colors } from 'styles';

// Components
import Styled from '../Styled';

const Placeholder = Styled.H8.extend`
  color: rgba(0,0,0,.6);
`;

const Dropdown = ({ placeholder, children, menuStyle, style }) => (
  <Downshift>
    {({ getInputProps, getMenuProps, isOpen, openMenu }) => (
      <div style={{ zIndex: 100 }}>
        <div
          {...getInputProps({
            onClick: openMenu,
          })}
          style={{
            padding: 10,
            backgroundColor: colors.gray15,
            cursor: 'pointer',
            ...style,
          }}
        >
          <Placeholder>{placeholder}</Placeholder>
        </div>
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
                  ...menuStyle,
                }
              : null
          }
        >
          {isOpen ? children : null}
        </div>
      </div>
    )}
  </Downshift>
);

Dropdown.propTypes = {};

Dropdown.defaultProps = {
  style: {},
  menuStyle: {},
};

export default Dropdown;
