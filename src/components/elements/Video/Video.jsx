import React from 'react';
import { map } from 'ramda';

import Image from 'components/elements/Image';

import { propTypes, defaultProps } from './Video.props';

const renderSrc = ({ path, type }) => <source key={path} src={path} type={`video/${type}`} />;
const renderSrcs = map(renderSrc);

export const Video = ({ srcs, fallbackImage, ...props }) => (
  <video {...props}>
    {renderSrcs(srcs)}
    {fallbackImage && <Image src={fallbackImage} alt="" />}
  </video>
);

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;

export default Video;
