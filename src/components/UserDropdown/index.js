// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';

// App
import { logOut } from 'actions/auth';
import { colors } from 'styles';

// Components
import Dropdown from '../Dropdown';
import Styled from '../Styled';

const Placeholder = Styled.H7.extend`
  color: ${colors.gold10};
`;

const Options = Styled.View.extend`
  background-color: ${colors.white16};
`;

const Option = Styled.View.extend`
  margin-vertical: 5px;
`;

const Touchable = Styled.Touchable.extend`
`;

const Text = Styled.H7.extend`
  margin-horizontal: 10px;
  color: ${colors.gold10};
`;

const isAdmin = (user) => user.type === 'admin';

const UserDropdown = ({ history, user, logOut }) => user ? (
  <Dropdown
    placeholder={<Placeholder>{_.upperCase(`${user.firstName} ${user.lastName}`)}</Placeholder>}
    menuStyle={{
      left: null,
      width: 200,
    }}
    style={{
      backgroundColor: null,
      color: colors.gold10,
    }}
  >
    <Options>
      {isAdmin(user) && <Option><Link to="/admin"><Text>Admin</Text></Link></Option>}
      <Option><Link to="/settings"><Text>Settings</Text></Link></Option>
      <Option>
        <Touchable
          onPress={() => {
            logOut();
            history.push('/login');
          }}
        >
          <Text>Sign Out</Text>
        </Touchable>
      </Option>
    </Options>
  </Dropdown>
) : null;

export default withRouter(connect(undefined, { logOut })(UserDropdown));
