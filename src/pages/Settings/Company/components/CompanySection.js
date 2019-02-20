// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';
import CompanyForm from './CompanyForm';
import CompanyLogoForm from './CompanyLogoForm';

const Container = Styled.View.extend`
  padding: 30px;
  background-color: ${colors.gray16};
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Right = Styled.View.extend`
  margin-left: 30px;
`;

const CompanySection = ({ user }) => (
  <Container>
    <Row>
      <CompanyForm user={user} />
      <Right>
        <CompanyLogoForm user={user} />
      </Right>
    </Row>
  </Container>
);

export default CompanySection;
