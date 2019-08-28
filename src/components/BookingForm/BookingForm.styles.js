import styled from 'styled-components';

import { theme, Heading3 } from 'styles';

export const FormSection = styled.div`
  display: block;
  margin-bottom: ${theme.spacing.gutter * 5}px;
  position: relative;

  label {
    text-transform: uppercase;
    color: ${theme.palette.secondary};
    font-size: ${theme.fonts.sizes.default}px;

    span {
      font-size: ${theme.fonts.sizes.default}px;
    }
  }
`;

export const FormSectionTitle = styled(Heading3)`
  font-size: ${theme.fonts.sizes.default}px;
  color: ${theme.palette.neutral};
  font-weight: ${theme.fonts.bold};
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;
  line-height: 14px;
  padding: 0 0 ${theme.spacing.gutter * 1.5}px;
  margin: 0 0 ${theme.spacing.gutter * 1.5}px;
  border-bottom: 1px solid ${theme.borders.medium};
`;

export const Columns = styled.div`
  ${props => props.theme.breakpoints.tablet`
    display: flex;
    margin: 0;
  `}
`;

export const Column = styled.div`
  ${props => props.theme.breakpoints.tablet`
    flex: 1 1 50%;
    width: 50%;
    margin: ${theme.spacing.gutter}px;

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }
  `}
`;
