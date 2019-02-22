// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Header, Styled } from 'components';
import { RequestHotel } from 'pages/Hotels/components';
import { HotelDetails, HotelSidebar } from './components';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  align-self: center;
  width: 1280px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${colors.gray14};
  padding-top: 80px;
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Main = Styled.View.extend`
  flex: 1;
  margin-left: 30px;
`;

const HotelView = ({
  match: {
    params: { id },
  },
  fetchHotel,
}) => (
  <Container>
    <Header />
    <Content>
      <RequestHotel id={id}>
        {({ hotel }) => (
          <Row>
            <Main>
              <HotelDetails hotel={hotel} />
            </Main>
            <HotelSidebar hotel={hotel} />
          </Row>
        )}
      </RequestHotel>
    </Content>
  </Container>
);

export default HotelView;
