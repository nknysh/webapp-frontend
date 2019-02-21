// Libraries
import React from 'react';
import { withRouter } from 'react-router-dom';

// App
import { colors } from 'styles';

// Components
import { RadioButton, Styled } from 'components';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  margin-top: 30px;
`;

const Fields = Styled.View.extend`
  margin-horizontal: 30px;
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Field = Styled.View.extend`
  flex: 1;
`;

const Name = Styled.H8.extend`
  color: ${colors.black3};
`;

const Actions = Styled.View.extend`
  align-items: center;
  margin-top: 30px;
`;

const MainButton = Styled.Button.extend`
  width: 410px;
`;

const MainText = Styled.H7.extend`
  color: ${colors.white16};
`;

const SecondaryButton = Styled.Button.extend`
  width: 410px;
`;

const SecondaryText = Styled.H7.extend`
  color: ${colors.white16};
`;

const BookingPaymentOptions = ({ history, booking, values, handleChange, handleBlur, handleSubmit }) => (
  <Container>
    <Content>
      <Fields>
        <Row>
          <Name>PAYMENT METHOD</Name>
        </Row>
        <Row>
          <Field>
            <RadioButton
              name="paymentMethod"
              placeholder="PAY BY CREDIT CARD"
              value={values.paymentMethod === 'credit-card'}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>
          <Field>
            <RadioButton
              name="paymentMethod"
              placeholder="PAY BY BANK TRANSFER"
              value={values.paymentMethod === 'bank'}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>
        </Row>
      </Fields>
      <Actions>
        <Row>
          <MainButton onPress={handleSubmit}>
            <MainText>BOOK & PAY NOW</MainText>
          </MainButton>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <SecondaryButton onPress={() => {}}>
            <SecondaryText>REQUEST A PROVISIONAL BOOKING</SecondaryText>
          </SecondaryButton>
        </Row>
      </Actions>
    </Content>
  </Container>
);

export default withRouter(BookingPaymentOptions);
