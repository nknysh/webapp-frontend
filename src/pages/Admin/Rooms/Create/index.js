// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Header, Styled } from 'components';
import { RoomCreateForm } from './components';
import { RequestHotel } from 'pages/Hotels/components';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  align-self: center;
  width: 1160px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${colors.gray14};
`;

const RoomCreate = ({
  match: {
    params: { id },
  },
}) => (
  <Container>
    <Header />
    <Content>
      <RequestHotel id={id}>{({ hotel }) => <RoomCreateForm hotel={hotel} />}</RequestHotel>
    </Content>
  </Container>
);

export default RoomCreate;
