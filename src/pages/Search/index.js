// Libraries
import React from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

// App
import { colors } from 'styles';

// Components
import {
  Calendar,
  CoverPhoto,
  Dropdown,
  Form,
  Header,
  NumberInput,
  RadioButton,
  SelectInput,
  Styled,
} from 'components';

const Container = Styled.View.extend`
`;

const Fill = Styled.View.extend`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Content = Styled.View.extend`
  width: 1160px;
  align-items: center;
  align-self: center;
  margin-vertical: 200px;
`;

const SearchContainer = Styled.View.extend`
  padding: 20px;
  background-color: ${colors.gray14};
`;

const Fields = Styled.View.extend`
  flex-direction: row;
  align-items: center;
`;

const Field = Styled.View.extend`
  margin-right: 20px;
`;

const Input = Styled.TextInput.H8.extend`
`;

const Options = Styled.View.extend`
`;

const SubmitButton = Styled.Button.extend`
  width: 150px;
`;

const SubmitText = Styled.H7.extend`
  color: ${colors.white16};
`;

const Search = ({ history }) => (
  <Container>
    <Header />
    <Fill>
      <CoverPhoto />
    </Fill>
    <Content>
      <SearchContainer>
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

            // TODO(mark): Split into checkIn and checkOut.
            dates: '',
          }}
          onSubmit={values => {
            const query = qs.stringify(values);
            history.push(`/hotels?${query}`);
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched }) => (
            <form>
              <Fields>
                <Field>
                  <SelectInput
                    name="country"
                    placeholder="DESTINATION OR RESORT"
                    value={values.country}
                    options={[{ value: 'maldives', label: 'MALDIVES' }, { value: 'seychelles', label: 'SEYCHELLES' }]}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    style={{ width: 200 }}
                    Input={Input}
                  />
                </Field>
                <Calendar
                  name="dates"
                  placeholder="DATES"
                  value={values.dates}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ width: 250 }}
                />
                <Field>
                  <Dropdown placeholder="ACCOMODATIONS" style={{ width: 175 }}>
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
                <SubmitButton onPress={handleSubmit}>
                  <SubmitText>SEARCH</SubmitText>
                </SubmitButton>
              </Fields>
            </form>
          )}
        </Form>
      </SearchContainer>
    </Content>
  </Container>
);

export default withRouter(Search);
