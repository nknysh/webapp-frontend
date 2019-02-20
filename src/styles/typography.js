// Libraries
import { css } from 'styled-components';

// App
import colors from './colors';

// Headings
const h1 = () => css`
  font-family: 'HurmeGeometricSans2, Open Sans, sans-serif';
  font-size: 40px;
  line-height: 55px;
  font-weight: 400;
  color: ${colors.black3};
`;

const h2 = () => css`
  font-family: 'HurmeGeometricSans2, Open Sans, sans-serif';
  font-size: 30px;
  line-height: 41px;
  font-weight: 400;
  color: ${colors.black3};
`;

const h3 = () => css`
  font-family: 'HurmeGeometricSans2, Open Sans, sans-serif';
  font-size: 26px;
  line-height: 36px;
  font-weight: 400;
  color: ${colors.black3};
`;

const h4 = () => css`
  font-family: 'HurmeGeometricSans2, Open Sans, sans-serif';
  font-size: 22px;
  line-height: 30px;
  font-weight: 400;
  color: ${colors.black3};
`;

const h5 = () => css`
  font-family: 'HurmeGeometricSans2, Open Sans, sans-serif';
  font-size: 18px;
  line-height: 25px;
  font-weight: 400;
  color: ${colors.black3};
`;

const h6 = () => css`
  font-family: 'HurmeGeometricSans2, Open Sans, sans-serif';
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
  color: ${colors.black3};
`;

const h7 = () => css`
  font-family: 'HurmeGeometricSans2, Open Sans, sans-serif';
  font-size: 14px;
  line-height: 19px;
  font-weight: 400;
  color: ${colors.black3};
`;

const h8 = () => css`
  font-family: 'HurmeGeometricSans2, Open Sans, sans-serif';
  font-size: 11px;
  line-height: 16px;
  font-weight: 400;
  color: ${colors.black3};
`;

export default {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  h7,
  h8,
};
