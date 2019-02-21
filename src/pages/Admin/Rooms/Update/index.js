// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Header, Styled } from 'components';
import { RequestRoom } from 'pages/Rooms/components';
import { RoomUpdateForm } from './components';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  align-self: center;
  width: 1160px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${colors.gray14};
`;

const Sides = Styled.View.extend`
`;

const Side = Styled.View.extend`
  flex: 1;
`;

const RoomUpdate = ({
  match: {
    params: { id },
  },
}) => (
  <Container>
    <Header />
    <Content>
      <RequestRoom id={id}>
        {({ room }) => (
          <Sides>
            <Side>
              <RoomUpdateForm room={room} />
            </Side>
            <Side />
          </Sides>
        )}
      </RequestRoom>
    </Content>
  </Container>
);

export default RoomUpdate;
