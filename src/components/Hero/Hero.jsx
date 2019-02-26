import React from 'react';

import { propTypes } from './Hero.props';
import { StyledHero, HeroChildren, HeroTitle, HeroVideo } from './Hero.styles';
import { Video } from 'components';

const renderTitle = title => title && <HeroTitle>{title}</HeroTitle>;

const renderChildren = children => children && <HeroChildren>{children}</HeroChildren>;

const renderVideo = (video, fallbackImage) =>
  video && (
    <HeroVideo>
      <Video srcs={[video]} fallbackImage={fallbackImage} autoPlay loop />
    </HeroVideo>
  );

export const Hero = ({ media: { image, video }, children, title, full, offsetBy, className }) => (
  <StyledHero className={className} full={full} image={image} offsetBy={offsetBy}>
    {renderVideo(video, image)}
    {renderTitle(title)}
    {renderChildren(children)}
  </StyledHero>
);

Hero.propTypes = propTypes;

export default Hero;
