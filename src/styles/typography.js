import styled, { css } from 'styled-components';

import theme from './theme';

export const commonHeaderStyles = css`
  font-family: ${theme.headingFont};
  letter-spacing: 1px;
`;

export const h1Styling = css`
  ${commonHeaderStyles}
  color: ${theme.colors['gold-neutral']};
  font-size: 22px;
  font-weight: bold;
  margin: ${theme.gutter * 2}px;
`;

export const Heading1 = styled.h1`
  ${h1Styling}
`;

export const h2Styling = css`
  ${commonHeaderStyles}
  color: ${theme.primary};
`;

export const Heading2 = styled.h2`
  ${h2Styling}
`;

export const h3Styling = css`
  font-size: 18px;
  text-transform: uppercase;
  color: ${theme.primary};
`;

export const Heading3 = styled.h3`
  ${h3Styling}
`;

export const h4Styling = css`
  text-transform: uppercase;
`;

export const Heading4 = styled.h4`
  ${h4Styling}
`;

export const h5Styling = css`
  text-transform: uppercase;
`;

export const Heading5 = styled.h5`
  ${h5Styling}
`;

export const pStyling = css`
  line-height: 20px;
`;

export const P = styled.p`
  ${pStyling}
`;

export default { Heading1, Heading2, Heading3, Heading4, Heading5, P };
