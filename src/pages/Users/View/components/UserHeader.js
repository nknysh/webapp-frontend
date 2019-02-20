// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
`;

const Name = Styled.H4.extend`
  margin-top: 50px;
  color: ${colors.black3};
`;

const Line = Styled.View.extend`
  margin-vertical: 20px;
  height: 1px;
  background-color: ${colors.gray14};
`;

const Label = Styled.H6.extend`
  color: ${colors.gray14};
`;

const Value = Styled.H6.extend`
  margin-top: 2px;
  color: ${colors.black3};
`;

const UserHeader = ({ user }) => (
  <Container>
    <Content>
      <Name>{`${user.firstName} ${user.lastName}`}</Name>
      <Line />
      <Label>Email Address</Label>
      <Value>{user.email}</Value>
    </Content>
  </Container>
);

export default UserHeader;
