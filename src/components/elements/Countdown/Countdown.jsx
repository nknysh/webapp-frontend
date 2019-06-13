import React from 'react';
import { partial } from 'ramda';
import { default as BaseCountDown } from 'react-countdown-now';

const renderCountdown = ({ children, label }, { completed, days, hours, minutes }) =>
  completed ? children : `${label} ${days && `${days}D`} ${hours && `${hours}H`} ${minutes && `${minutes}M`}`;

export const CountDown = ({ children, label, ...props }) => (
  <BaseCountDown renderer={partial(renderCountdown, [{ label, children }])} {...props} />
);

export default CountDown;
