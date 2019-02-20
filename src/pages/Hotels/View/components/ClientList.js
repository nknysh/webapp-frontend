// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
  padding: 24px;
  height: 260px;
  width: 90%;
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-bottom: 40px;
`;

const Line = Styled.View.extend`
  height: 1px;
  background-color: ${colors.gray14};
`;

const Name = Styled.H7.extend`
  color: ${colors.black3};
`;

const Row = Styled.View.extend`
  flex-direction: row;
  padding: 2px;
`;

const Column = Styled.View.extend`
  flex-direction: column;
`;

const Date = Styled.H8.extend`
  color: ${colors.gray11};
`;

// TODO(JAMES): connect BE to get real client data per TA
const ClientList = ({ style }) => (
  <Container style={style}>
    <Line />
    <Column>
      <Row>
        <Name>Client Name</Name>
      </Row>
      <Row>
        <Date>Created 3/27/18</Date>
      </Row>
    </Column>
    <Line/>       
    <Column>
      <Row>
        <Name>Client Name</Name>
      </Row>
      <Row>
        <Date>Created 3/27/18</Date>
      </Row>
    </Column>
    <Line/>       
    <Column>
      <Row>
        <Name>Client Name</Name>
      </Row>
      <Row>
        <Date>Created 3/27/18</Date>
      </Row>
    </Column>
    <Line/>       
    <Column>
      <Row>
        <Name>Client Name</Name>
      </Row>
      <Row>
        <Date>Created 3/27/18</Date>
      </Row>
    </Column>
    <Line/>       
    <Column>
      <Row>
        <Name>Client Name</Name>
      </Row>
      <Row>
        <Date>Created 3/27/18</Date>
      </Row>
    </Column>
    <Line/>       
    <Column>
      <Row>
        <Name>Client Name</Name>
      </Row>
      <Row>
        <Date>Created 3/27/18</Date>
      </Row>
    </Column>
    <Line/>       
  </Container>
);

export default ClientList;
