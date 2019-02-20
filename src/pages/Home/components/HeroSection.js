// Libraries
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// App
import { colors } from 'styles';

// Components
import { CoverPhoto, Styled } from 'components';

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
  margin-vertical: 400px;
`;

const Title = Styled.H3.extend`
  color: ${colors.white16};
  text-align: center;
`;

const Subtitle = Styled.H6.extend`
  margin-top: 10px;
  max-width: 500px;
  color: ${colors.white16};
  text-align: center;
`;

const Actions = Styled.View.extend`
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
`;

const Text = Styled.H7.extend`
  margin-right: 10px;
  color: ${colors.white16};
`;

const LoginButton = Styled.Button.extend`
  margin-left: 10px;
  width: 120px;
  background-color: ${colors.gold10};
  border-color: ${colors.gold4};
`;

const LoginText = Styled.H7.extend`
  color: ${colors.white16};
`;

const HeroSection = ({ history }) => (
  <Container>
    <Fill>
      <CoverPhoto />
    </Fill>
    <Content>
      <Title>PURE ESCAPES</Title>
      <Subtitle>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Subtitle>
      <Actions>
        <Link to="/sign-up"><Text>CREATE AN ACCOUNT</Text></Link>
        <LoginButton
          onPress={() => history.push('/login')}
        >
          <LoginText>LOG IN</LoginText>
        </LoginButton>
      </Actions>
    </Content>
  </Container>
);

export default withRouter(HeroSection);
