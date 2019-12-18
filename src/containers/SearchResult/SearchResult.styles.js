import styled from 'styled-components';
import { Icon } from '@material-ui/core';
import { Chip, ToolTip as BaseToolTip } from '@pure-escapes/webapp-ui-components';

import Card from 'components/Card';
import { theme } from 'styles';

export const StyledCard = styled(Card)`
  position: relative;
  margin: 0 0 ${theme.spacing.gutter * 2}px;
  padding-bottom: ${theme.spacing.gutter * 1.6}px;

  ${props => props.theme.breakpoints.tablet`
      margin ${theme.spacing.gutter}px;
    `}
`;

export const CardImage = styled(Card.Image)`
  position: relative;
  border-bottom: 1px solid ${theme.borders.default};
`;

export const CardChip = styled(Chip)``;

export const CardChipAvailability = styled(Chip)`
  color: ${props => props.theme.palette.available};
`;

export const CardPrice = styled(Card.Price)``;

export const CardDetails = styled.div`
  padding: ${theme.spacing.gutter * 2}px;
`;

export const CardTitle = styled(Card.Title)`
  margin-bottom: ${theme.spacing.gutter}px;
`;

export const CardDescription = styled(Card.Description)`
  border: 0;
  margin: 0;
`;

export const CardText = styled.div`
  color: ${theme.palette.neutral};
`;

export const CardPreferred = styled.div`
  background: ${theme.palette.primary};
  font-size: ${theme.fonts.sizes.normal}px;
  font-weight: ${theme.fonts.bold};
  position: absolute;
  top: 0;
  left: ${theme.spacing.gutter * 2}px;
  padding: ${theme.spacing.gutter}px ${theme.spacing.gutter * 2}px;
  color: ${theme.colors.white};
  text-transform: uppercase;
`;

export const CardCta = styled.div`
  padding: 0 ${theme.spacing.gutter * 2}px ${theme.spacing.gutter * 2}px;
`;

export const CardRating = styled.div`
  padding: 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.borders.default};
  padding-bottom: ${theme.spacing.gutter}px;
  margin-bottom: ${theme.spacing.gutter}px;
`;

export const CardStarRating = styled.div`
  font-size: ${theme.fonts.sizes.normal}px;
  color: ${theme.palette.primary};
  font-weight: ${theme.fonts.bold};
  text-transform: uppercase;
  flex: 1;
  display: flex;
  align-items: center;
`;

export const CardStar = styled(Icon)`
  fill: ${theme.palette.primary};
  margin-right: ${theme.spacing.gutter / 2}px;
  font-size: ${theme.fonts.sizes.bigger}px;
`;

export const CardStarText = styled.span`
  flex: 1;
  font-size: ${theme.fonts.sizes.default}px;
  letter-spacing: 0.38px;
  line-height: ${theme.fonts.sizes.normal}px;
`;

export const Columns = styled.div`
  ${props => props.theme.breakpoints.tablet`
        display: flex;
    `}
`;

export const Column = styled.div`
  ${props => props.theme.breakpoints.tablet`
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
  padding-top: ${theme.spacing.gutter}px;
  margin-bottom: ${theme.spacing.gutter}px;

  ${props => props.theme.breakpoints.tablet`
    display: flex;
    flex-wrap: wrap;
  `}
`;

export const CardHighlight = styled.div`
  margin: ${theme.spacing.gutter / 2}px 0;
  display: block;
  font-size: ${theme.fonts.sizes.default}px;

  ${props => props.theme.breakpoints.tablet`
    flex: 1 1 50%;
    width: 50%;
  `}
`;

export const CardAdditionalInfo = styled.div`
  display: block;
  padding-top: ${theme.spacing.gutter}px;
`;

export const CardAdditional = styled.p`
  display: block;
  margin: ${theme.spacing.gutter}px 0;
  font-size: ${theme.fonts.sizes.normal}px;
  color: ${theme.palette.neutral};

  &:last-child {
    margin: 0;
  }
`;

export const ToolTip = styled(BaseToolTip)`
  padding: 0;
`;

export const PriceBreakdown = styled.ul`
  margin: ${theme.spacing.gutter}px;
  padding: 0;
`;

export const PriceBreakdownItem = styled.li`
  margin-bottom: ${theme.spacing.gutter / 2}px;
`;

export const CardChipStack = styled.div`
  margin: 0 ${theme.spacing.gutter / 2}px;

  > div {
    margin: ${theme.spacing.gutter}px 0 0;
  }
`;
