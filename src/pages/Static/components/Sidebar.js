// Libraries
import React from 'react';
import { Link } from 'react-router-dom';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
  width: 300px;
  margin-right: 150px;
`;

const Title = Styled.H4.extend`
  color: ${colors.gold10};
  margin-bottom: 20px;
`;

const Items = Styled.View.extend`
`;

const Line = Styled.View.extend`
  height: 2px;
  background-color: ${colors.gray15};
`;

const Item = Styled.View.extend`
`;

const Name = Styled.H7.extend`
  margin-vertical: 20px;
`;

const Sidebar = ({ title, items }) => (
  <Container>
    <Title>{title}</Title>
    <Line />
    <Items>
      {items.map(({ name, tag }, index) => (
        <Item key={index}>
          <Link to={`#${tag}`} style={{ marginTop: 20, marginBottom: 20 }}>
            <Name>{name}</Name>
          </Link>
          <Line />
        </Item>
      ))}
    </Items>
  </Container>
);

export default Sidebar;
