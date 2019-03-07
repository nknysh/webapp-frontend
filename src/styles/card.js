import styled from 'styled-components';

import uiConfig from 'config/ui';

import theme from './theme';
import breakpoints from './breakpoints';
import { Heading2 } from './typography';

export const Card = styled.article`
  background: ${theme.colors.whiteish};
  margin: ${theme.gutter}px;

  ${breakpoints.tablet`
    flex: 0 1 33%;
  `}
`;

export const CardImage = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  height: 300px;
  display: flex;
  align-items: flex-end;
  padding: ${theme.gutter * 2}px;
`;

export const CardChip = styled.div`
    background: ${theme.backgroundColor};
    padding: ${theme.gutter / 2}px ${theme.gutter}px;
    font-size: 12px;
    text-transform: uppercase;
    margin 0 ${theme.gutter / 2}px;
    line-height: 18px;

    :first-child {
        margin-left: 0;
    }

    :last-child {
        margin-right: 0;
    }
`;

export const CardChipSecondary = styled(CardChip)`
  color: ${theme.colors['red-fade']};
  font-weight: ${theme.bold};
  padding: ${theme.gutter / 2 + 1}px ${theme.gutter}px;
`;

export const CardPrice = styled.span`
    font-size: 18px;

    :before {
        content: '${uiConfig.currency.symbol}';
    }
`;

export const CardDetails = styled.div`
    padding ${theme.gutter * 2}px;
`;

export const CardTitle = styled(Heading2)`
  color: ${theme.primary};
  font-size: 20px;
  font-weight: ${theme.bold};
  margin: 0 0 ${theme.gutter * 2}px;
  padding: ${theme.gutter}px 0 ${theme.gutter * 2}px;
  border-bottom: 1px solid ${theme.borderColor};
`;

export const CardDescription = styled.div`
  color: ${theme.secondary};
  font-size: 12px;
  text-transform: uppercase;
  line-height: 20px;
  letter-spacing: 0.46px;
  padding: 0 0 ${theme.gutter * 2}px;
  margin: 0 0 ${theme.gutter * 2}px;
  border-bottom: 1px solid ${theme.borderColor};
`;

export const CardText = styled.div`
  color: ${theme.colors['gold-neutral']};
`;
