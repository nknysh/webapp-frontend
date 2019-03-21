import React, { Fragment } from 'react';

import BaseSlider from 'react-slick';

import theme from 'styles/theme';

import 'slick-carousel/slick/slick.css';

import { propTypes, defaultProps } from './Slider.props';
import { GlobalSliderStyles, SliderArrowNext, SliderArrowPrev } from './Slider.styles';

export const Slider = React.forwardRef((props, ref) => (
  <Fragment>
    <GlobalSliderStyles />
    <BaseSlider
      arrows={false}
      centerMode
      centerPadding={`${theme.gutter * 3}px`}
      lazyLoad="ondemand"
      ref={ref}
      nextArrow={<SliderArrowNext>keyboard_arrow_right</SliderArrowNext>}
      prevArrow={<SliderArrowPrev>keyboard_arrow_left</SliderArrowPrev>}
      {...props}
    />
  </Fragment>
));

Slider.displayName = 'Slider';
Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
