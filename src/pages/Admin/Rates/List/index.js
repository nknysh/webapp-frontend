// Libraries
import React from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { connect } from 'react-redux';
import _ from 'lodash';

// App
import { colors } from 'styles';
import { fetchRatesForRoom } from 'actions/rates';
import { getRatesForRoom } from 'selectors/rates';

// Components
import { Form, Header, Request, Styled, Table } from 'components';

const moment = extendMoment(Moment);

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  align-self: center;
  width: 1160px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${colors.gray14};
`;

const Title = Styled.H2.extend`
  margin-top: 40px;
  color: ${colors.gold10};
  text-align: center;
`;

const Rates = Styled.View.extend`
  margin-top: 40px;
`;

const getRange = (startDate, endDate) => {
  const start = moment(startDate, 'YYYY-MM-DD');
  const end = moment(endDate, 'YYYY-MM-DD');
  const range = moment.range(start, end);
  return Array.from(range.by('day'));
};

const RatesList = ({ match: { params: { id }}, fetchRatesForRoom }) => (
  <Container>
    <Header />
    <Request
      getState={(state) => ({ rates: getRatesForRoom(state, id) })}
      onRequest={(values) => fetchRatesForRoom({ ...values, roomId: id })}
    >
      {({ rates }) => (
        <Content>
          <Title>Room & Rate Grid</Title>
          <Form
            initialValues={{
              startDate: '2018-10-08',
              endDate: '2018-10-23',
            }}
            onSubmit={(values) => {}}
          >
            {({ values }) => (
              <Rates>
                <Table
                  data={rates}
                  columns={
                    _.concat(
                      [{
                        Header: '',
                        accessor: 'rateName',
                        width: 200,
                      }],
                      getRange(values.startDate, values.endDate).map((date, index) => ({
                        Header: date.format('YYYY-MM-DD'),
                        id: date.format('YYYY-MM-DD'),
                        accessor: rate => _.get(rate, `days[${index}].value`),
                        width: 100,
                      })),
                    )
                  }
                  defaultPageSize={10}
                  noDataText="No Rates"
                />
              </Rates>
            )}
          </Form>
        </Content>
      )}
    </Request>
  </Container>
);

export default connect(undefined, { fetchRatesForRoom })(RatesList);
