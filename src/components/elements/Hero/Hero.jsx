import React from 'react';

import Video from 'components/elements/Video';

import { propTypes, defaultProps } from './Hero.props';
import { StyledHero, HeroChildren, HeroTitle, HeroVideo, HeroMask } from './Hero.styles';

const renderMask = mask => mask && <HeroMask />;

const renderVideo = (video, fallbackImage) =>
  video && (
    <HeroVideo>
      <Video srcs={[video]} fallbackImage={fallbackImage} autoPlay loop muted playsInline />
    </HeroVideo>
  );

const renderTitle = title => title && <HeroTitle>{title}</HeroTitle>;

const renderChildren = children => children && <HeroChildren>{children}</HeroChildren>;

export const Hero = ({ media: { image, video }, children, title, full, offsetBy, mask, className }) => (
  <StyledHero className={className} full={full} image={image} offsetBy={offsetBy}>
    {renderMask(mask)}
    {renderVideo(video, image)}
    {renderTitle(title)}
    {renderChildren(children)}
  </StyledHero>
);

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
