import styled, { css } from 'styled-components';
import { Checkbox } from '@pure-escapes/webapp-ui-components';

import { default as BaseContextMenu } from 'components/ContextMenu';

import { theme } from 'styles';

export const Margin = styled.div`
  margin-left: auto;
`;

export const MarginCheckbox = styled(Checkbox)`
  label {
    margin: 0 !important;

    > span {
      padding-left: 0 !important;
      font-size: ${theme.fonts.sizes.default}px !important;
      line-height: 14px !important;
      text-transform: uppercase;
      color: ${theme.palette.primary} !important;
    }
  }
`;

export const MarginInputs = styled.div`
  margin-bottom: ${theme.spacing.gutter * 2.2}px;

  .material-select__input {
    text-transform: capitalize;
    margin: 0;
  }

  ${props => props.theme.breakpoints.tablet`
    display: flex;

    > * {
      flex: 1;
      margin: ${theme.spacing.gutter / 2}px;

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
  color: ${theme.palette.secondary};
  margin: 0;
  font-size: ${theme.fonts.sizes.default}px;
  line-height: ${theme.fonts.sizes.big}px;
  text-align: center;

  ${({ ['data-compact']: compact }) =>
    compact &&
    css`
      display: flex;
      text-align: left;
    `}
`;

export const MarginTotalAmount = styled.span`
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
  padding: 0 0 ${theme.spacing.gutter * 1.5}px;
  text-transform: uppercase;
  font-weight: ${theme.fonts.bold};
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;
  line-height: 14px;
  color: ${theme.palette.neutral};
  border-bottom: 1px solid ${theme.borders.default};
`;

export const ContextMenu = styled(BaseContextMenu)`
  flex: 0 1;
  padding: 0 0 0 ${theme.spacing.gutter / 2}px;
`;

export const MarginWrapper = styled.div`
  margin: 0 ${theme.spacing.gutter}px;
`;
