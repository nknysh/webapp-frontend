import React from 'react';

import { propTypes } from './Hero.props';
import { StyledHero, HeroChildren, HeroTitle } from './Hero.styles';

const renderTitle = title => title && <HeroTitle>{title}</HeroTitle>;

const renderChildren = children => children && <HeroChildren>{children}</HeroChildren>;

export const Hero = ({ image, children, title, full, offsetBy, className }) => (
  <StyledHero className={className} full={full} image={image} offsetBy={offsetBy}>
    {renderTitle(title)}
    {renderChildren(children)}
  </StyledHero>
);

Hero.propTypes = propTypes;

export default Hero;
