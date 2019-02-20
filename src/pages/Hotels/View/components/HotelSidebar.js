// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// App
import { colors } from 'styles';
import { createBooking } from 'actions/bookings';

// Components
import { Dropdown, Form, NumberInput, RadioButton, Styled } from 'components';
import SidebarSection from './SidebarSection';
import OptionsModal from './OptionsModal';
import ProposalModal from './ProposalModal';

const Container = Styled.View.extend`
  width: 450px;
  margin-left: 30px;
`;

const Content = Styled.View.extend`
`;

const Sections = Styled.View.extend`
  padding-vertical: 30px;
  padding-horizontal: 20px;
  background-color: ${colors.gray16};
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const NetCost = Styled.H7.extend`
`;

const Price = Styled.H2.extend`
`;

const Notes = Styled.View.extend`
  margin-vertical: 15px;
`;

const Note = Styled.H8.extend`
`;

const Line = Styled.View.extend`
  height: 1px;
  background-color: ${colors.gray14};
`;

const Name = Styled.H4.extend`
  margin-vertical: 10px;
  color: ${colors.gold10};
`;

const Input = Styled.TextInput.H8.extend`
  margin-top: 5px;
`;

const Options = Styled.View.extend`
`;

const Field = Styled.View.extend`
  flex: 1;
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

const HotelSidebar = ({ history, hotel, createBooking }) => (
  <Container>
    <Form
      initialValues={{
        hotelId: hotel.id,
        checkIn: new Date(),
        checkOut: new Date(),
        numAdults: 0,
        numChildren: 0,
        numInfants: 0,
        mealPlan: 'BB',

        // TODO(mark): Add back
        // returnTransfer: '',
        // groundService: '',
        // addOns: '',

        // TODO(mark): Remove / figure out what these are for?
        rate: 0,
        status: 'booked',
        taMarginAmount: 0,
        taMarginType: 'percentage',
      }}
      onSubmit={(values) => {
        console.log('create a booking with values', values);
        createBooking(values).then((booking) => {
          history.push(`/bookings/${booking.id}/guests`);
        });
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched }) => (
        <Content>
          <Sections>
            <Row style={{ justifyContent: 'space-between' }}>
              <NetCost>TOTAL NET COST TO YOU</NetCost>
              <Price>{`$${hotel.barRate || 1000}`}</Price>
            </Row>
            <Notes>
              <Note>INCLUDES ALL APPLICABLE TAXES</Note>
              <Note>YOU SAVE $0,000.00 COMPARED TO BOOKING DIRECTLY W/ THIS PROPERTY</Note>
            </Notes>
            <Line />
            <Name>{hotel.name}</Name>
            <SidebarSection title="DATES">
              <Input
                name="dates"
                value={values.dates}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </SidebarSection>
            <SidebarSection title="GUESTS" style={{ zIndex: 100 }}>
              <Dropdown
                placeholder="SELECT ACCOMODATIONS"
                style={{ marginTop: 10 }}
              >
                <Options>
                  <NumberInput
                    name="numAdults"
                    placeholder="ADULTS"
                    value={values.numAdults}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  <NumberInput
                    name="numChildren"
                    placeholder="CHILDREN (2-12)"
                    value={values.numChildren}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  <NumberInput
                    name="numInfants"
                    placeholder="INFANTS (0-2)"
                    value={values.numInfants}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                </Options>
              </Dropdown>
            </SidebarSection>
            <SidebarSection title="MEAL PLAN">
              <Row>
                <Field>
                  <RadioButton
                    name="mealPlan"
                    placeholder="BREAKFAST (INC. IN PRICE)"
                    value={values.mealPlan === 'BB'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                <Field>
                  <RadioButton
                    name="mealPlan"
                    placeholder="HALF BOARD + $500"
                    value={values.mealPlan === 'HB'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
              </Row>
              <Row>
                <Field>
                  <RadioButton
                    name="mealPlan"
                    placeholder="FULL BOARD + $1,000"
                    value={values.mealPlan === 'FB'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
              </Row>
            </SidebarSection>
            <SidebarSection title="RETURN TRANSFERS">
              <Row>
                <Field>
                  <RadioButton
                    name="returnTransfer"
                    placeholder="SPEEDBOAT (INC. IN PRICE)"
                    value={values.returnTransfer === 'SPEEDBOAT'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                <Field>
                  <RadioButton
                    name="returnTransfer"
                    placeholder="PVT. SPEEDBOAT + $1,040"
                    value={values.returnTransfer === 'PVT_SPEEDBOAT'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
              </Row>
              <Row>
                <Field>
                  <RadioButton
                    name="returnTransfer"
                    placeholder="PVT. NALADU BOAT + $2,090"
                    value={values.returnTransfer === 'PVT_NALADU'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                <Field>
                  <RadioButton
                    name="returnTransfer"
                    placeholder="PVT. SEAPLANE + $2,690"
                    value={values.returnTransfer === 'PVT_SEAPLANE'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
              </Row>
              <Row>
                <Field>
                  <RadioButton
                    name="returnTransfer"
                    placeholder="PVT. NIRVANA YACHT + $4,690"
                    value={values.returnTransfer === 'PVT_NIRVANA'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
              </Row>
            </SidebarSection>
            <SidebarSection title="GROUND SERVICE">
              <Row>
                <Field>
                  <RadioButton
                    name="groundService"
                    placeholder="AIRPORT MEETING (INC. IN PRICE)"
                    value={values.groundService === 'AIRPORT'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                <Field>
                  <RadioButton
                    name="groundService"
                    placeholder="CIP LOUNGE (ARR) + $500"
                    value={values.groundService === 'LOUNGE'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
              </Row>
            </SidebarSection>
            <SidebarSection title="ADD-ONS">
              <Row>
                <Field>
                  <RadioButton
                    name="addOns"
                    placeholder="EARLY CHECK-IN + $350"
                    value={values.addOns === 'EARLY_CHECK_IN'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                <Field>
                  <RadioButton
                    name="addOns"
                    placeholder="LATE CHECK-OUT + $500"
                    value={values.addOns === 'LATE_CHECK_OUT'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
              </Row>
              <Row>
                <Field>
                  <RadioButton
                    name="addOns"
                    placeholder="ADD-ON 3"
                    value={values.addOns === '3'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                <Field>
                  <RadioButton
                    name="addOns"
                    placeholder="ADD-ON 4"
                    value={values.addOns === '4'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
              </Row>
            </SidebarSection>
            <SidebarSection title="MARGIN">
              <Note>Your current margin will be $000.00, 10% of the total cost shown above</Note>
            </SidebarSection>
          </Sections>
          <Actions>
            <MainButton
              onPress={handleSubmit}
            >
              <MainText>
                BOOK NOW
              </MainText>
            </MainButton>
            <Row style={{ marginTop: 10 }}>
              <OptionsModal id={hotel.id} bookingValues={values}/>
              <ProposalModal id={hotel.id}/>
            </Row>
          </Actions>
        </Content>
      )}
    </Form>
  </Container>
);

export default withRouter(connect(undefined, { createBooking })(HotelSidebar));
