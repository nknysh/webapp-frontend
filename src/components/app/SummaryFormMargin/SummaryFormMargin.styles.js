import styled, { css } from 'styled-components';

import { Checkbox } from 'components/elements';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { withCurrency } from 'styles/elements';

export const Margin = styled.div``;

export const MarginCheckbox = styled(Checkbox)`
  label {
    margin: 0 !important;

    > span {
      padding-left: 0 !important;
      font-size: ${theme.fonts.sizes.default}px !important;
      line-height: 14px !important;
      text-transform: uppercase;
      color: ${theme.primary} !important;
    }
  }
`;

export const MarginInputs = styled.div`
  margin-bottom: ${theme.gutter * 2.2}px;

  .material-select__input {
    text-transform: capitalize;
    margin: 0;
  }

  ${breakpoints.tablet`
    display: flex;

    > * {
      flex: 1;
      margin: ${theme.gutter / 2}px;

      :first-child {
        margin-left: 0;
      }

      :last-child {
        margin-right: 0;
      }
    }
  `}
`;

export const MarginTotal = styled.div`
  color: ${theme.secondary};
  margin: 0;
  font-size: ${theme.fonts.sizes.default}px;
  line-height: ${theme.fonts.sizes.big}px;
  text-align: center;

  ${({ ['data-compact']: compact }) =>
    compact &&
    css`
      text-align: right;
    `}
`;

export const MarginTotalAmount = styled.span`
  ${withCurrency};
  font-weight: ${theme.fonts.bold};
`;

export const MarginPercentSuffix = styled.span`
  :after {
    content: '%';
  }
`;

export const MarginValue = styled.span`
  :before {
    content: ', ';
  }

  ${({ ['data-compact']: compact }) =>
    compact &&
    css`
      :before {
        content: '';
      }

      display: block;
    `}
`;

export const Title = styled.h3`
  font-size: ${theme.fonts.sizes.default}px;
  padding: 0 0 ${theme.gutter * 1.5}px;
  text-transform: uppercase;
  font-weight: ${theme.fonts.bold};
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;
  line-height: 14px;
  color: ${theme.neutral};
  border-bottom: 1px solid ${theme.borders.default};
`;
