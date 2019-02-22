// Libraries
import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Styled from '../Styled';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  width: 1160px;
  align-self: center;
`;

const Links = Styled.View.extend`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-vertical: 50px;
`;

const Text = Styled.H7.extend`
  margin-horizontal: 10px;
`;

const Footer = () => (
  <Container>
    <Content>
      <Links>
        <Link to="/about">
          <Text>ABOUT US</Text>
        </Link>
        <Link to="/contact">
          <Text>CONTACT US</Text>
        </Link>
        <Link to="/privacy">
          <Text>PRIVACY POLICY</Text>
        </Link>
        <Link to="/terms">
          <Text>TERMS AND CONDITIONS</Text>
        </Link>
      </Links>
    </Content>
  </Container>
);

export default Footer;
