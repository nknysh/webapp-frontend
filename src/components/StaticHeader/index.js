// Libraries
import React from 'react';

// Components
import Styled from '../Styled';

// Assets
import Background from './assets/cover-photo.jpg';

const CoverPhoto = Styled.Image.extend`
  height: 400px;
`;

const StaticHeader = () => <CoverPhoto source={Background} />;

export default StaticHeader;
