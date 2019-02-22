// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { colors } from 'styles';

// Components
import { Styled, Label } from 'components';
import HotelInfo from './HotelInfo';

const Container = Styled.View.extend`
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Main = Styled.View.extend`
  flex: 1;
  margin: 30px;
`;

const Field = Styled.View.extend`
  margin-bottom: 20px;
`;

const Input = Styled.TextInput.H8.extend`
`;

const TextInput = Styled.TextInput.H8.extend`
`;

const Title = Styled.H7.extend`
  width: 100%;
`;

const Line = Styled.View.extend`
  height: 1px;
  background-color: ${colors.black3};
`;

const ProposalDetails = ({ proposal }) => (
  <Container>
    <Main>
      <Row>
        <Field style={{ width: '50%', paddingRight: 30 }}>
          <Label htmlFor="clientName">CLIENT NAME</Label>
          <Input name="clientName" value={proposal.clientName} />
        </Field>
        <Field style={{ width: '50%' }}>
          <Label htmlFor="clientEmail">CLIENT EMAIL</Label>
          <Input name="clientEmail" value={proposal.clientEmail} />
        </Field>
      </Row>
      <Row>
        <Field style={{ width: '100%' }}>
          <Label htmlFor="remarks">CUSTOM MESSAGE (OPTIONAL)</Label>
          <TextInput style={{ height: 100 }} name="remarks" value={proposal.remarks} />
        </Field>
      </Row>
      <Row style={{ marginTop: 10, marginBottom: 20 }}>
        <Title>PROPERTIES AND ROOMS INCLUDED IN THIS PROPOSAL</Title>
        <Line />
      </Row>
      <HotelInfo />
    </Main>
  </Container>
);

export default connect(
  undefined,
  {}
)(ProposalDetails);
