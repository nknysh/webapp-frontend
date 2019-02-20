// Libraries
import React from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

// App
import { colors } from 'styles';

// Components
import { Dropdown, Form, Label, NumberInput, RadioButton, SelectInput, Styled } from 'components';
import SidebarSection from './SidebarSection';

const Container = Styled.View.extend`
  width: 300px;
`;

const Actions = Styled.View.extend`
  align-items: center;
  margin-top: 20px;
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Field = Styled.View.extend`
  margin-top: 20px;
`;

const Input = Styled.TextInput.H8.extend`
  margin-top: 5px;
`;

const Options = Styled.View.extend`
`;

const Text = Styled.H7.extend`
  color: ${colors.gold10};
`;

const RemoveButton = Styled.Button.extend`
  width: 200px;
`;

const RemoveText = Styled.H7.extend`
  color: ${colors.white16};
`;

const AMENITIES = [
  'SWIMMING POOL',
  'VILLA WITH POOL',
  'HOUSE REEFCLUB',
  'KIDS CLUB',
  'ADULTS ONLY',
  'BUTLER',
  'SPA',
  'TENNIS',
  'GOLF',
  'SURF',
  'SEAPLANE',
  'SPEEDBOAT',
  'NIGHT CLUB',
  'UNDERWATER DINING',
  'SMALL ISLAND',
];

const HotelSidebar = ({ history }) => (
  <Container>
    <Form
      initialValues={{
        country: '',
        checkIn: '',
        checkOut: '',
        numRooms: 1,
        numAdults: 0,
        numChildren: 0,
        numInfants: 0,
        honeymooners: false,

        region: 'all',
        minPrice: 0,
        maxPrice: 10000,
        starRating: 5,
        propertyType: 'any',
        mealPlan: 'BB',
        amenities: '',

        // TODO(mark): Split into checkIn and checkOut.
        dates: '',
      }}
      onSubmit={(values) => {
        const query = qs.stringify(values);
        history.push(`/hotels?${query}`);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched }) => (
        <form>
          <SidebarSection title="SEARCH" style={{ zIndex: 100 }}>
            <Field style={{ zIndex: 100 }}>
              <SelectInput
                name="country"
                placeholder="DESTINATION OR RESORT"
                value={values.country}
                options={[
                  { value: 'maldives', label: 'MALDIVES' },
                  { value: 'seychelles', label: 'SEYCHELLES' },
                ]}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                style={{ width: '100%' }}
                Input={Input}
              />
            </Field>
            <Field>
              <Label htmlFor="dates">DATES</Label>
              <Input
                name="dates"
                value={values.dates}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            <Field style={{ zIndex: 100 }}>
              <Label htmlFor="accomodations">ACCOMODATIONS</Label>
              <Dropdown
                placeholder="SELECT ACCOMODATIONS"
                style={{ marginTop: 10 }}
              >
                <Options>
                  <NumberInput
                    name="numRooms"
                    placeholder="ROOMS"
                    value={values.numRooms}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
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
            </Field>
            <Field>
              <RadioButton
                name="honeymooners"
                placeholder="HONEYMOONERS"
                value={values.honeymooners}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
          </SidebarSection>
          <SidebarSection title="REGION" style={{ marginTop: 30 }}>
            <Field>
              <RadioButton
                name="region"
                placeholder="ALL REGIONS"
                value={values.region === 'all'}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            <Field style={{ marginTop: 0 }}>
              <RadioButton
                name="region"
                placeholder="SPECIFY REGION"
                value={values.region !== 'all'}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
          </SidebarSection>
          <SidebarSection title="PRICE RANGE">
            <Text>Prices shown are in US Dollars</Text>
          </SidebarSection>
          <SidebarSection title="PROPERTY RATING">
            <Row>
              <Field style={{ marginTop: 0 }}>
                <RadioButton
                  name="starRating"
                  placeholder="5 STAR"
                  value={values.starRating === 5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              <Field style={{ marginTop: 0 }}>
                <RadioButton
                  name="starRating"
                  placeholder="5 STAR+"
                  value={values.starRating === 6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
            </Row>
          </SidebarSection>
          <SidebarSection title="ROOM TYPE">
            <Row>
              <Field style={{ marginTop: 0 }}>
                <RadioButton
                  name="propertyType"
                  placeholder="ANY"
                  value={values.propertyType === 'any'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              <Field style={{ marginTop: 0 }}>
                <RadioButton
                  name="propertyType"
                  placeholder="VILLA"
                  value={values.propertyType === 'villa'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
            </Row>
          </SidebarSection>
          <SidebarSection title="MEAL PLAN">
            <Row>
              <Field style={{ marginTop: 0 }}>
                <RadioButton
                  name="mealPlan"
                  placeholder="BB"
                  value={values.mealPlan === 'BB'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              <Field style={{ marginTop: 0 }}>
                <RadioButton
                  name="mealPlan"
                  placeholder="HB"
                  value={values.mealPlan === 'HB'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              <Field style={{ marginTop: 0 }}>
                <RadioButton
                  name="mealPlan"
                  placeholder="FB"
                  value={values.mealPlan === 'FB'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              <Field style={{ marginTop: 0 }}>
                <RadioButton
                  name="mealPlan"
                  placeholder="AI"
                  value={values.mealPlan === 'AI'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
            </Row>
          </SidebarSection>
          <SidebarSection title="AMENITIES">
            {AMENITIES.map((amenity, index) => (
              <Field
                key={index}
                style={{ marginTop: 0 }}
              >
                <RadioButton
                  name="amenities"
                  placeholder={amenity}
                  value={values.amenities === amenity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
            ))}
            <Actions>
              <RemoveButton
                onPress={() => {}}
              >
                <RemoveText>
                  REMOVE ALL FILTERS
                </RemoveText>
              </RemoveButton>
              <RemoveButton
                onPress={handleSubmit}
                style={{ marginTop: 10 }}
              >
                <RemoveText>
                  UPDATE SEARCH
                </RemoveText>
              </RemoveButton>
            </Actions>
          </SidebarSection>
        </form>
      )}
    </Form>
  </Container>
);

export default withRouter(HotelSidebar);
