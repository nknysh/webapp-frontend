// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import Styled from '../Styled';

const Container = Styled.View.extend`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  padding-horizontal: 10px;
  background-color: ${colors.white16};
`;

const Placeholder = Styled.H8.extend`
`;

const Values = Styled.View.extend`
  flex-direction: row;
  align-items: center;
`;

const Change = Styled.View.extend`
  height: 16px;
  width: 16px;
  border-radius: 8px;
  background-color: ${colors.gold10};
`;

const ChangeText = Styled.H8.extend`
  color: ${colors.white16};
  text-align: center;
`;

const Value = Styled.H8.extend`
  margin-horizontal: 5px;
`;

const NumberInput = ({ name, placeholder, value, onChange }) => (
  <Container>
    <Placeholder>{placeholder}</Placeholder>
    <Values>
      <Change onClick={() => onChange(name, value - 1)}>
        <ChangeText>-</ChangeText>
      </Change>
      <Value>{value}</Value>
      <Change onClick={() => onChange(name, value + 1)}>
        <ChangeText>+</ChangeText>
      </Change>
    </Values>
  </Container>
);

export default NumberInput;
