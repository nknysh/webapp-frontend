// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View } from 'react-primitives';
import { TextInput, TouchableOpacity } from 'react-native-web';
import styled from 'styled-components/primitives';
import _ from 'lodash';

// Styles
import colors from 'styles/colors';
import typography from 'styles/typography';

// Create a new instance of the styled components function.
const Styled = tag => styled(tag);

// Assign primitives that we can extend.
const createComponent = (Component, extraProps = {}) => {
  if (process.env.NODE_ENV === 'production') {
    return styled(Component);
  }

  const propTypes = Component.propTypes || {};
  const keys = Object.keys(_.assign({}, propTypes, extraProps));
  const withFilter = props => <Component {..._.pick(props, keys)} />;
  return styled(withFilter);
};

Styled.View = createComponent(View)``;
Styled.Text = createComponent(Text)``;
Styled.TextInput = createComponent(TextInput, { name: '' })``;
Styled.Image = createComponent(Image)``;

// TODO(mark): There's a bug with the normal Touchable so we override it.
Styled.Touchable = Styled(TouchableOpacity)``;

// Headings
Styled.H1 = Styled.Text.extend`${props => typography.h1(props)}`;
Styled.H2 = Styled.Text.extend`${props => typography.h2(props)}`;
Styled.H3 = Styled.Text.extend`${props => typography.h3(props)}`;
Styled.H4 = Styled.Text.extend`${props => typography.h4(props)}`;
Styled.H5 = Styled.Text.extend`${props => typography.h5(props)}`;
Styled.H6 = Styled.Text.extend`${props => typography.h6(props)}`;
Styled.H7 = Styled.Text.extend`${props => typography.h7(props)}`;
Styled.H8 = Styled.Text.extend`${props => typography.h8(props)}`;

// TextInputs
Styled.TextInput = Styled.TextInput.extend`
  background-color: ${colors.gray15};
  height: 40px;
  padding-horizontal: 10px;
`;

Styled.TextInput.H6 = Styled.TextInput.extend`
  ${props => typography.h6(props)}
  ${props => (props.multiline ? 'padding-top: 10px' : '')}
`;

Styled.TextInput.H8 = Styled.TextInput.extend`
  ${props => typography.h8(props)}
  ${props => (props.multiline ? 'padding-top: 10px' : '')}
`;

// Buttons
Styled.Button = Styled.Touchable.extend`
  align-items: center;
  justify-content: center;
  width: ${props => props.width}px;
  height: 40px;
  background-color: ${props => props.color};
  border-width: 1px;
  border-style: solid;
  border-color: ${colors.gold4};
  cursor: pointer;
`;

Styled.Button.propTypes = {
  width: PropTypes.number,
  color: PropTypes.string,
};

Styled.Button.defaultProps = {
  activeOpacity: 1,
  width: 150,
  color: colors.gold10,
};

export default Styled;
