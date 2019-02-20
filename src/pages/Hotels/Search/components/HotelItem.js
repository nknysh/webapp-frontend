// Libraries
import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
`;

const Wrapper = Styled.View.extend`
`;

const PriceBox = Styled.View.extend`
  flex-direction: row;
  align-items: flex-end;
  position: absolute;
  left: 20px;
  bottom: 20px;
  padding-vertical: 8px;
  padding-horizontal: 15px;
  background-color: ${colors.gray15};
`;

const PriceFrom = Styled.H7.extend`
`;

const PriceValue = Styled.H5.extend`
  margin-left: 5px;
`;

const CoverPhoto = Styled.Image.extend`
  height: 250px;
  background-color: ${colors.gray14};
`;

const Content = Styled.View.extend`
  padding: 20px;
  background-color: ${colors.gray16};
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Line = Styled.View.extend`
  height: 1px;
  background-color: ${colors.gray14};
`;

const Name = Styled.H4.extend`
  color: ${colors.gold10};
`;

const Rating = Styled.H6.extend`
  color: ${colors.gold10};
`;

const Item = Styled.View.extend`
  flex: 1;
`;

const Resource = Styled.H8.extend`
  color: ${colors.gold4};
`;

const Footer = Styled.H8.extend`
  color: ${colors.gold4};
`;

const fill = (array, size) => _.assign(_.fill(new Array(size), undefined), array);

const HotelItem = ({ hotel }) => (
  <Container>
    <Wrapper>
      <CoverPhoto
        source={{
          uri: hotel.featuredPhotoUrl,
          height: 250,
        }}
      />
      <PriceBox>
        <PriceFrom>FROM</PriceFrom>
        <PriceValue>{`$${hotel.barRate || 1000}`}</PriceValue>
      </PriceBox>
    </Wrapper>
    <Content>
      <Row style={{ marginBottom: 10 }}>
        <Link to={`/hotels/${hotel.id}`}><Name>{hotel.name}</Name></Link>
      </Row>
      <Line />
      <Row style={{ marginVertical: 10 }}>
        <Rating>{`${hotel.starRating} STAR`}</Rating>
      </Row>
      <Line />
      <Row style={{ marginVertical: 10 }}>
        {_.chunk(hotel.resources, 3).map((chunk, row) => (
          <Row
            key={row}
            style={{ flex: 1 }}
          >
            {fill(chunk, 3).map((resource, column) => (
              <Item key={column}>
                <Resource>{_.upperCase(resource)}</Resource>
              </Item>
            ))}
          </Row>
        ))}
      </Row>
      <Line />
      <Row style={{ marginVertical: 20 }}>
        <Footer>
          PRICE ABOVE BASED ON 7 NIGHTS IN SUNRISE BEACH VILLAS, BB
        </Footer>
      </Row>
    </Content>
  </Container>
);

export default HotelItem;
