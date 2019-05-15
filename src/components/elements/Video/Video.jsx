import React from 'react';
import { map } from 'ramda';

import { propTypes, defaultProps } from './Video.props';
import { FallbackImage } from './Video.styles';

// eslint-disable-next-line
const renderSrc = ({ path, type }) => <source key={path} src={path} type={`video/${type}`} />;
const renderSrcs = map(renderSrc);

export const Video = ({ srcs, fallbackImage, ...props }) => (
  <video {...props}>
    {renderSrcs(srcs)}
    {fallbackImage && <FallbackImage src={fallbackImage} alt="" />}
  </video>
);

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;

export default Video;
