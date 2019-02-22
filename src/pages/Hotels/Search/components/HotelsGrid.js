// Libraries
import React from 'react';
import _ from 'lodash';

// Components
import { Styled } from 'components';
import HotelItem from './HotelItem';

const Container = Styled.View.extend`
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Item = Styled.View.extend`
  flex: 1;
  margin-right: ${props => (props.row % 1 === 0 ? 20 : 0)}px;
  margin-bottom: 20px;
`;

const fill = (array, size) => _.assign(_.fill(new Array(size), undefined), array);

const HotelsGrid = ({ hotels }) => (
  <Container>
    {_.chunk(hotels, 2).map((chunk, row) => (
      <Row key={row}>
        {fill(chunk, 2).map((hotel, column) => (
          <Item key={column} row={row} column={column}>
            {hotel && <HotelItem hotel={hotel} />}
          </Item>
        ))}
      </Row>
    ))}
  </Container>
);

export default HotelsGrid;
