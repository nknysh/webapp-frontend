import React, { Fragment } from 'react';

import BaseSlider from 'react-slick';

import 'slick-carousel/slick/slick.css';
// import "slick-carousel/slick/slick-theme.css";

import { propTypes, defaultProps } from './Slider.props';
import { GlobalSliderStyles } from './Slider.styles';

export const Slider = props => (
  <Fragment>
    <GlobalSliderStyles />
    <BaseSlider centerMode {...props} />
  </Fragment>
);

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
