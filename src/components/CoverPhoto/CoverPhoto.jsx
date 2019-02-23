// Libraries
import React from 'react';

import img from './cover_photo.png';

const CoverPhoto = () => (
  <div
    style={{
      backgroundSize: 'cover',
      backgroundImage: `url(${img})`,
      width: window.innerWidth,
      height: window.innerHeight,
    }}
  />
);

export default CoverPhoto;
