// Libraries
import React from 'react';

// Components
import Styled from '../Styled';

// Assets
import Photo from './cover_photo.png';

const Image = Styled.Image.extend`
`;

const CoverPhoto = () => (
  <Image
    resizeMode="cover"
    source={{
      uri: Photo,
      width: window.innerWeight,
      height: window.innerHeight,
    }}
  />
);

export default CoverPhoto;
