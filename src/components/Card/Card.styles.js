import styled from 'styled-components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

import {
  Card as Base,
  CardImage as BaseImage,
  CardChip as BaseChip,
  CardChipSecondary as BaseChipSecondary,
  CardPrice as BasePrice,
  CardTitle as BaseTitle,
  CardDetails as BaseDetails,
  CardDescription as BaseDescription,
  CardText as BaseText,
} from 'styles/card';
import { Icon } from '@material-ui/core';

export const StyledCard = styled(Base)`
  position: relative;
  margin: 0;

  ${breakpoints.tablet`
      margin ${theme.gutter}px;
    `}
`;

export const CardImage = styled(BaseImage)`
  position: relative;
`;

export const CardChip = styled(BaseChip)``;

export const CardPrice = styled(BasePrice)``;

export const CardName = styled(BaseChipSecondary)``;

export const CardDetails = styled(BaseDetails)``;

export const CardTitle = styled(BaseTitle)`
  margin-bottom: ${theme.gutter}px;
`;

export const CardDescription = styled(BaseDescription)`
  border: 0;
  margin: 0;
`;

export const CardText = styled(BaseText)``;

export const CardPreferred = styled.div`
    background: ${theme.primary};
    font-size: 12px;
    font-weight: ${theme.bold};
    position: absolute;
    top:0;
    left: ${theme.gutter * 2}px;
    padding ${theme.gutter}px ${theme.gutter * 2}px;
    color: ${theme.colors.white};
    text-transform: uppercase;
`;

export const CardCta = styled.div`
  padding: 0 ${theme.gutter * 2}px ${theme.gutter * 2}px;
`;

export const CardRating = styled.div`
  padding: 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.borderColor};
  padding-bottom: ${theme.gutter}px;
  margin-bottom: ${theme.gutter}px;
`;

export const CardStarRating = styled.div`
  font-size: 12px;
  color: ${theme.primary};
  font-weight: ${theme.bold};
  text-transform: uppercase;
  flex: 1;
  display: flex;
  align-items: center;
`;

export const CardStar = styled(Icon)`
  fill: ${theme.primary};
  margin-right: ${theme.gutter / 2}px;
`;

export const CardStarText = styled.span`
  flex: 1;
`;

export const Columns = styled.div`
  ${breakpoints.tablet`
        display: flex;
    `}
`;

export const Column = styled.div`
  ${breakpoints.tablet`
        flex: 1;
    `}
`;

export const CardSecondaryRating = styled.div`
  font-weight: ${theme.bold};
  text-transform: uppercase;
  color: ${theme.colors.marine};
  font-size: 12px;
  width: 50%;
`;

export const CardHighlights = styled.div`
  color: ${theme.colors.black};
  font-size: 12px;
  text-transform: uppercase;
  border-bottom: 1px solid ${theme.borderColor};
  padding-bottom: ${theme.gutter}px;
  margin-bottom: ${theme.gutter}px;
  ${breakpoints.tablet`
    display: flex;
    flex-wrap: wrap;
  `}
`;

export const CardHighlight = styled.div`
  margin: ${theme.gutter / 2}px 0;
  display: block;

  ${breakpoints.tablet`
    flex: 1 1 50%;
    width: 50%;
  `}
`;

export const CardAdditionalInfo = styled.div`
  display: block;
  padding-top: ${theme.gutter}px;
`;

export const CardAdditional = styled.p`
  display: block;
  margin: ${theme.gutter}px 0;
  font-size: 14px;
  color: ${theme.colors['gold-neutral']};

  &:last-child {
    margin: 0;
  }
`;
