// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { getCurrentUser } from 'store/modules/auth/selectors';
import { getUser } from 'store/modules/users/selectors';
import { fetchUser } from 'store/modules/users/actions';

// Components
import { Header, Request, Styled } from 'components';
import SettingsSidebar from './SettingsSidebar';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  align-self: center;
  width: 1160px;
  margin-top: 100px;
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Main = Styled.View.extend`
  flex: 1;
  margin-left: 100px;
`;

const SettingsPage = ({ currentUser, fetchUser, children }) => (
  <Container>
    <Header />
    <Content>
      <Request
        getState={state => ({ user: getUser(state, currentUser.id) })}
        onRequest={() => fetchUser({ id: currentUser.id })}
      >
        {({ user }) => (
          <Row>
            <SettingsSidebar user={user} />
            <Main>{children({ user })}</Main>
          </Row>
        )}
      </Request>
    </Content>
  </Container>
);

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
});

export default connect(
  mapStateToProps,
  { fetchUser }
)(SettingsPage);
