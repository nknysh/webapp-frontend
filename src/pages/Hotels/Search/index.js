// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { fetchHotels } from 'store/modules/hotels/actions';
import { getHotels } from 'store/modules/hotels/selectors';
import { colors } from 'styles';

// Components
import { Header, Request, Styled } from 'components';
import { HotelSidebar, HotelsGrid } from './components';

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

const Title = Styled.H4.extend`
  margin-bottom: 30px;
`;

const HotelsSearch = ({ searchHotels }) => (
  <Container>
    <Header />
    <Content>
      <Request getState={state => ({ hotels: getHotels(state) })} onRequest={searchHotels}>
        {({ hotels }) => (
          <Row>
            <HotelSidebar />
            <Main>
              <Title>{`${hotels.length} properties found`}</Title>
              <HotelsGrid hotels={hotels} />
            </Main>
          </Row>
        )}
      </Request>
    </Content>
  </Container>
);

// TODO(mark): Change fetchHotels --> searchHotels once we have derby soft keys.
export default connect(
  undefined,
  { searchHotels: fetchHotels }
)(HotelsSearch);
