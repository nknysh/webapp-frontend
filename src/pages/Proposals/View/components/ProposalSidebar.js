// Libraries
import React from 'react';
import moment from 'moment';

// App
import { colors } from 'styles';

// Components
import { Styled, RadioButton } from 'components';

const Container = Styled.View.extend`
  padding: 10px;
`;

const Main = Styled.View.extend`
  flex: 1;
  margin-left: 30px;
`;

const Margins = Styled.View.extend`
  padding: 20px;
  margin-left: 30px;
  background-color: ${colors.gray16};
`;

const Field = Styled.View.extend`
  margin-top: 4px;
`;

const Row = Styled.View.extend`
  flex-direction: row;
  margin-vertical: 5px;
`;

const Date = Styled.H5.extend`
  padding: 15px;
`;

const Option = Styled.H6.extend`
`;

const Text = Styled.H7.extend`
`;

const Input = Styled.TextInput.H6.extend`
  width: 60px;
  height: 30px;
  margin-left: 10px;
  margin-top: -5px;
  background-color: white;
`;

const Line = Styled.View.extend`
  height: 1px;
  background-color: black;
`;

const CircleContainer = Styled.View.extend`
  padding-top: 17px;
`;

const LineContainer = Styled.View.extend`
  width: 5px;
  margin-left: 9px;
`;

const Circle = () => (
  <CircleContainer>
    <svg height="15" width="15">
      <circle cx="10" cy="10" r="3" stroke="black" fill="black" />
    </svg>
  </CircleContainer>
)

const VerticalLine = () => (
  <LineContainer>
    <svg height="100" width="15" padding="0" margin="0">
      <line x1="0"  y1="25" x2="0" y2="90" style={{stroke: "black"}} />
    </svg>
  </LineContainer>
)

const formatDate = (date) => moment(date).format('MMMM D')

const ProposalDetails = ({proposal, handleBlur, handleChange}) => (
    <Container>
      <Main>
        <Row>
          <Circle />
          <Date>Checking in {formatDate(proposal.checkInDate)}</Date>
        </Row>
        <Row style={{position: 'absolute'}}>
          <VerticalLine />
        </Row>
        <Row>
          <Circle />
          <Date>Checking out {formatDate(proposal.checkOutDate)}</Date>
        </Row>
        <Margins>
          <Row>
            <Option>MARGIN</Option>
          </Row>
          <Line />
          <Row>
            <Field>
              <RadioButton
                style={{marginRight: 20, fontSize: 16, color: '#BFBFBF' }}
                name="isMargin"
                placeholder=""
                value={'margin'}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            <Text>APPLY A MARGIN</Text>
          </Row>
          <Row>
            <Field>
              <RadioButton
                style={{marginRight: 20, fontSize: 16, color: '#BFBFBF' }}
                name="isMargin"
                placeholder=""
                value={'direct'}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            <Text>CLIENT IS PAYING DIRECTLY</Text>
          </Row>
          <Line style={{backgroundColor: '#BFBFBF', marginVertical: '10px'}}/>
          <Row>
            <Field>
              {/* TODO(james): change defaultChecked to value and use this to make it checked */}
              <RadioButton
                style={{marginRight: 20, fontSize: 16, color: '#BFBFBF' }}
                name="marginType"
                placeholder=""
                value={'percentage'}
                defaultChecked={proposal.taMarginType === 'percentage'}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            <Text>PERCENTAGE</Text>
            <Input
              name="percentage"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Row>
          <Row>
            <Field>
              <RadioButton
                style={{marginRight: 20, fontSize: 16, color: '#BFBFBF' }}
                name="marginType"
                placeholder=""
                value={'fixed'}
                defaultChecked={proposal.taMarginType === 'fixed'}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            <Text>FIXED</Text>
            <Input
              name="fixed"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Row>
          <Row>
            {/* TODO(james): connect BE to company */}
            <Text>The default rate for your company is 10%</Text>
          </Row>
        </Margins>
      </Main>
  </Container>
);

export default ProposalDetails;
