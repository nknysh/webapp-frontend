// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: 40px;
`;

const Content = Styled.View.extend`
  flex: 1;
  justify-content: center;
  height: 40px;
  padding-horizontal: 30px;
  background-color: ${colors.gray9};
`;

const Title = Styled.H7.extend`
  color: ${colors.white16};
`;

const ActionButton = Styled.Button.extend`
  margin-left: 2px;
  width: 150px;
`;

const ActionText = Styled.H7.extend`
  color: ${colors.white16};
`;

const SectionHeader = ({ title, action, onPress }) => (
  <Container>
    <Content>
      <Title>{title}</Title>
    </Content>
    {action && (
      <ActionButton onPress={onPress}>
        <ActionText>{action}</ActionText>
      </ActionButton>
    )}
  </Container>
);

export default SectionHeader;
