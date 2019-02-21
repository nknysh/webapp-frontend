// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Header, Styled } from 'components';
import { RequestHotel } from 'pages/Hotels/components';
import { HotelUpdateForm } from './components';

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

const HotelUpdate = ({
  match: {
    params: { id },
  },
}) => (
  <Container>
    <Header />
    <Content>
      <RequestHotel id={id}>
        {({ hotel }) => (
          <Sides>
            <Side>
              <HotelUpdateForm hotel={hotel} />
            </Side>
            <Side />
          </Sides>
        )}
      </RequestHotel>
    </Content>
  </Container>
);

export default HotelUpdate;
