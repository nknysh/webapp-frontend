import styled from 'styled-components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { Heading3 } from 'styles/typography';

export const FormSection = styled.div`
  display: block;
  margin-bottom: ${theme.gutter * 5}px;
  position: relative;

  label {
    text-transform: uppercase;
    color: ${theme.secondary};
    font-size: ${theme.fonts.sizes.default}px;

    span {
      font-size: ${theme.fonts.sizes.default}px;
    }
  }
`;

export const FormSectionTitle = styled(Heading3)`
  font-size: ${theme.fonts.sizes.default}px;
  color: ${theme.neutral};
  font-weight: ${theme.fonts.bold};
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;
  line-height: 14px;
  padding: 0 0 ${theme.gutter * 1.5}px;
  margin: 0 0 ${theme.gutter * 1.5}px;
  border-bottom: 1px solid ${theme.borders.medium};
`;

export const Columns = styled.div`
  ${breakpoints.tablet`
    display: flex;
    margin: 0;
  `}
`;

export const Column = styled.div`
  ${breakpoints.tablet`
    flex: 1 1 50%;
    width: 50%;
    margin: ${theme.gutter}px;

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }
  `}
`;
