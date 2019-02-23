// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// App
import { colors } from 'styles';
import { getCurrentUser } from 'store/modules/auth/selectors';

// Components
import Styled from '../Styled';
import UserDropdown from '../UserDropdown';

const Container = Styled.View.extend`
  background-color: ${colors.white16};
  z-index: 100;
`;

const Content = Styled.View.extend`
  height: 100px;
  width: 1160px;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: space-between;
`;

const Logo = Styled.View.extend`
  width: 200px;
  background-color: ${colors.gray11};
`;

const Links = Styled.View.extend`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Text = Styled.H7.extend`
  margin-horizontal: 10px;
  color: ${colors.gold10};
`;

const isAdmin = user => user && user.type === 'admin';
const isSalesRepresentative = user => user && user.type === 'sr';
const isRatesAdmin = user => user && user.type === 'rates-admin';

const Header = ({ currentUser }) => (
  <Container>
    <Content>
      <Logo />
      <Links>
        {isAdmin(currentUser) ? (
          <React.Fragment>
            <Link to="/">
              <Text>HOME</Text>
            </Link>
            <Link to="/admin/dashboard">
              <Text>DASHBOARD</Text>
            </Link>
            <Link to="/messages">
              <Text>MESSAGES</Text>
            </Link>
            <Link to="/admin/hotels">
              <Text>HOTELS</Text>
            </Link>
            <Link to="/admin/bookings">
              <Text>BOOKINGS</Text>
            </Link>
            <Link to="/admin/proposals">
              <Text>PROPOSALS</Text>
            </Link>
            <Link to="/admin/travel-agents">
              <Text>TRAVEL AGENTS</Text>
            </Link>
            <Link to="/admin/sales-representatives">
              <Text>SALES REPS</Text>
            </Link>
          </React.Fragment>
        ) : isSalesRepresentative(currentUser) ? (
          <React.Fragment>
            <Link to="/">
              <Text>HOME</Text>
            </Link>
            <Link to="/messages">
              <Text>MESSAGES</Text>
            </Link>
            <Link to="/calendar">
              <Text>CALENDAR</Text>
            </Link>
            <Link to="/proposals">
              <Text>PROPOSALS</Text>
            </Link>
            <Link to="/bookings">
              <Text>BOOKINGS</Text>
            </Link>
            <Link to="/holds">
              <Text>HOLDS</Text>
            </Link>
            <Link to="/admin/travel-agents">
              <Text>TRAVEL AGENTS</Text>
            </Link>
          </React.Fragment>
        ) : isRatesAdmin(currentUser) ? (
          <React.Fragment>
            <Link to="/">
              <Text>HOME</Text>
            </Link>
            <Link to="/admin/hotels">
              <Text>HOTELS</Text>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/">
              <Text>HOME</Text>
            </Link>
            <Link to="/messages">
              <Text>MESSAGES</Text>
            </Link>
            <Link to="/calendar">
              <Text>CALENDAR</Text>
            </Link>
            <Link to="/proposals">
              <Text>PROPOSALS</Text>
            </Link>
            <Link to="/bookings">
              <Text>BOOKINGS</Text>
            </Link>
            <Link to="/holds">
              <Text>HOLDS</Text>
            </Link>
          </React.Fragment>
        )}
        <UserDropdown user={currentUser} />
      </Links>
    </Content>
  </Container>
);

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps)(Header);
