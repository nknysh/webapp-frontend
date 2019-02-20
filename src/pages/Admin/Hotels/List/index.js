// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { resetHotels, fetchHotels } from 'actions/hotels';
import { getHotels } from 'selectors/hotels';
import { colors } from 'styles';

// Components
import { Form, Header, Request, Styled } from 'components';
import { HotelsTable } from 'pages/Hotels/components';
import { HotelsFilters } from './components';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  align-self: center;
  width: 1160px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${colors.gray14};
`;

const Main = Styled.View.extend`
`;

const HotelsList = ({ resetHotels, searchHotels }) => (
  <Container>
    <Header />
    <Request
      getState={(state) => ({ hotels: getHotels(state) })}
      onRequest={(values) => {
        resetHotels();
        return searchHotels({ q: values.query, query: {}});
      }}
    >
      {({ hotels, handleRequest }) => (
        <Form
          initialValues={{
            query: '',
          }}
          onSubmit={handleRequest}
        >
          {({ values, handleChange, submitForm }) => (
            <Content>
              <Main>
                <HotelsFilters
                  {...values}
                  onChange={handleChange}
                  onSubmit={submitForm}
                />
                <HotelsTable
                  hotels={hotels}
                />
              </Main>
            </Content>
          )}
        </Form>
      )}
    </Request>
  </Container>
);

// TODO(mark): Use searchHotels rather than fetchHotels.
export default connect(undefined, { resetHotels, searchHotels: fetchHotels })(HotelsList);
