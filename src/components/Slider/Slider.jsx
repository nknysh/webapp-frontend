import React, { Fragment } from 'react';

import BaseSlider from 'react-slick';

import theme from 'styles/theme';

import 'slick-carousel/slick/slick.css';

import { propTypes, defaultProps } from './Slider.props';
import { GlobalSliderStyles } from './Slider.styles';

export const Slider = props => (
  <Fragment>
    <GlobalSliderStyles />
    <BaseSlider centerMode centerPadding={`${theme.gutter * 3}px`} {...props} />
  </Fragment>
);

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
