import styled, { css } from 'styled-components';

import theme from './theme';

export const commonHeaderStyles = css`
  font-family: ${theme.fonts.headingFont};
  letter-spacing: ${theme.fonts.letterSpacing.whole}px;
`;

export const h1Styling = css`
  ${commonHeaderStyles}
  color: ${theme.neutral};
  font-size: ${theme.fonts.sizes.bigger}px;
  font-weight: ${theme.fonts.bold};
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
  font-size: ${theme.fonts.sizes.big}px;
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
