// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled, RadioButton } from 'components';

const Container = Styled.View.extend`
  width: 60%;
`;

const Field = Styled.View.extend`
`;

const Row = Styled.View.extend`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Title = Styled.H8.extend`
  padding-bottom: 16px;
  color: ${colors.gray11};
`;

const Brochures = ({ style, handleBlur, handleChange }) => (
  <Container style={style}>
    <Row>
      <Title>BROCHURES TO INCLUDE</Title>
    </Row>
    <Row>
      <Field>
        <RadioButton
          style={{ marginRight: 20, fontSize: 16, color: '#BFBFBF' }}
          name="addOns"
          placeholder="Brochure #1"
          value={'Brochure 1'}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Field>
      <Field>
        <RadioButton
          style={{ marginRight: 20, fontSize: 16, color: '#BFBFBF' }}
          name="addOns"
          placeholder="Brochure #2"
          value={'Brochure 1'}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Field>
      <Field>
        <RadioButton
          style={{ marginRight: 20, fontSize: 16, color: '#BFBFBF' }}
          name="addOns"
          placeholder="Brochure #3"
          value={'Brochure 1'}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Field>
      <Field>
        <RadioButton
          style={{ marginRight: 20, fontSize: 16, color: '#BFBFBF' }}
          name="addOns"
          placeholder="Brochure #4"
          value={'Brochure 1'}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Field>
      <Field>
        <RadioButton
          style={{ marginRight: 20, fontSize: 16, color: '#BFBFBF' }}
          name="addOns"
          placeholder="Brochure #5"
          value={'Brochure 1'}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Field>
      <Field>
        <RadioButton
          style={{ marginRight: 20, fontSize: 16, color: '#BFBFBF' }}
          name="addOns"
          placeholder="Brochure #6"
          value={'Brochure 1'}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Field>
    </Row>
  </Container>
);

export default Brochures;
