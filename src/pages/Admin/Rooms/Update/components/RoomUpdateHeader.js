// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  background-color: ${colors.gray16};
`;

const Title = Styled.H4.extend`
  color: ${colors.gold10};
`;

const Actions = Styled.View.extend`
  flex: 1;
  align-items: flex-end;
`;

const SubmitButton = Styled.Button.extend`
  width: 120px;
`;

const SubmitText = Styled.H7.extend`
  color: ${colors.white16};
`;

const RoomUpdateHeader = ({ room, onSubmit }) => (
  <Container>
    <Title>{room.name}</Title>
    <Actions>
      <SubmitButton onPress={onSubmit}>
        <SubmitText>UPDATE</SubmitText>
      </SubmitButton>
    </Actions>
  </Container>
);

export default RoomUpdateHeader;
