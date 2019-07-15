import styled from 'styled-components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { withDiscountStyles } from 'styles/elements';

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
import { ToolTip as BaseToolTip } from 'components/elements';

export const StyledCard = styled(Base)`
  position: relative;
  margin: 0 0 ${theme.gutter * 2}px;
  padding-bottom: ${theme.gutter * 1.6}px;

  ${breakpoints.tablet`
      margin ${theme.gutter}px;
    `}
`;

export const CardImage = styled(BaseImage)`
  position: relative;
  border-bottom: 1px solid ${theme.borders.default};
`;

export const CardChip = styled(BaseChip)``;

export const CardPrice = styled(BasePrice)`
  ${withDiscountStyles};
`;

export const CardSecondaryChip = styled(BaseChipSecondary)``;

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
    font-size: ${theme.fonts.sizes.normal}px;
    font-weight: ${theme.fonts.bold};
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
  border-bottom: 1px solid ${theme.borders.default};
  padding-bottom: ${theme.gutter}px;
  margin-bottom: ${theme.gutter}px;
`;

export const CardStarRating = styled.div`
  font-size: ${theme.fonts.sizes.normal}px;
  color: ${theme.primary};
  font-weight: ${theme.fonts.bold};
  text-transform: uppercase;
  flex: 1;
  display: flex;
  align-items: center;
`;

export const CardStar = styled(Icon)`
  fill: ${theme.primary};
  margin-right: ${theme.gutter / 2}px;
  font-size: ${theme.fonts.sizes.bigger}px;
`;

export const CardStarText = styled.span`
  flex: 1;
  font-size: ${theme.fonts.sizes.default}px;
  letter-spacing: 0.38px;
  line-height: ${theme.fonts.sizes.normal}px;
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
  font-weight: ${theme.fonts.bold};
  text-transform: uppercase;
  color: ${theme.colors.marine};
  font-size: ${theme.fonts.sizes.default}px;
  letter-spacing: 0.38px;
  line-height: ${theme.fonts.sizes.normal}px;
  width: 50%;
`;

export const CardHighlights = styled.div`
  color: ${theme.colors.black};
  font-size: ${theme.fonts.sizes.normal}px;
  text-transform: uppercase;
  border-bottom: 1px solid ${theme.borders.default};
  padding-top: ${theme.gutter}px;
  padding-bottom: ${theme.gutter * 2}px;
  margin-bottom: ${theme.gutter}px;

  ${breakpoints.tablet`
    display: flex;
    flex-wrap: wrap;
  `}
`;

export const CardHighlight = styled.div`
  margin: ${theme.gutter / 2}px 0;
  display: block;
  font-size: ${theme.fonts.sizes.default}px;

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
  font-size: ${theme.fonts.sizes.normal}px;
  color: ${theme.neutral};

  &:last-child {
    margin: 0;
  }
`;

export const ToolTip = styled(BaseToolTip)`
  padding: 0;
`;

export const PriceBreakdown = styled.ul`
  margin: ${theme.gutter}px;
  padding: 0;
`;

export const PriceBreakdownItem = styled.li`
  margin-bottom: ${theme.gutter / 2}px;
`;

export const CardChipStack = styled.div`
  margin: 0 ${theme.gutter / 2}px;

  > div {
    margin: ${theme.gutter}px 0 0;
  }
`;