import styled, { css } from 'styled-components';
import { NumberSelect, ToolTip, Chip } from '@pure-escapes/webapp-ui-components';

import { theme, Heading1 } from 'styles';

export const StyledRoom = styled.article`
  background: ${theme.backgrounds.secondary};
  flex-direction: column;
  margin: ${theme.spacing.gutter * 2}px 0;

  ${props => props.theme.breakpoints.tablet`
    display: flex;
    flex-direction: row;
  `}

  .tooltip, .tooltip > div {
    font-size: ${theme.fonts.sizes.normal}px !important;
  }
`;

export const RoomImage = styled.div`
  position: relative;
  flex: 1;
  min-height: 55px;

  ${props => props.theme.breakpoints.tablet`
    min-height: 300px;
    max-width: 45%;
    width: 45%;
  `}
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImgOffer = styled(Chip)`
  position: absolute;
  top: 0;
  left: ${theme.spacing.gutter * 2}px;

  ${props => props.theme.breakpoints.tablet`
    top: ${theme.spacing.gutter * 2}px;
  `}
`;

export const Selection = styled(NumberSelect)`
  background: rgba(161, 130, 101, 0.9);
  padding: ${theme.spacing.gutter}px;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-transform: uppercase;

  .add,
  .minus {
    > span {
      background: none !important;
      font-size: ${theme.fonts.sizes.default}px !important;
      line-height: 25px !important;
      font-weight: ${theme.fonts.bold};
    }
  }

  .count {
    color: ${theme.colors.white};
    font-size: ${theme.fonts.sizes.default}px !important;
    width: 100% !important;
  }
`;

export const RoomInfo = styled.div`
  padding: ${theme.spacing.gutter * 2}px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Columns = styled.div`
  display: block;
  width: 100%;

  ${props => props.theme.breakpoints.tablet`
    display: flex;
  `}
`;

export const Column = styled.div`
  ${props => props.theme.breakpoints.tablet`
    flex: 1;
    width: 50%;
  `}
`;

export const Title = styled(Heading1)`
  font-size: ${theme.fonts.sizes.big}px;
  color: ${theme.palette.primary};
  margin: 0 0 ${theme.spacing.gutter * 2}px;
  padding: 0;
`;

export const Price = styled.div`
  margin-bottom: ${theme.spacing.gutter * 3}px;

  ${props => props.theme.breakpoints.tablet`
    text-align: right;
    margin-bottom: 0;
  `}
`;

export const PriceAmount = styled.span`
  font-size: ${theme.fonts.sizes.big}px;
`;

export const PriceLabel = styled.span`
  font-size: ${theme.fonts.sizes.big}px;
  font-weight: ${theme.fonts.light};
  text-transform: lowercase;
`;

export const Info = styled.p`
  color: ${theme.palette.neutral};
  padding: 0 0 ${theme.spacing.gutter * 3}px;
  margin: 0 0 ${theme.spacing.gutter * 2}px;
  border-bottom: 1px solid ${theme.borders.default};
  font-size: ${theme.fonts.sizes.normal}px;
`;

export const Details = styled.div`
  color: ${theme.palette.secondary};
  text-transform: uppercase;
  font-size: ${theme.fonts.sizes.default}px;
  padding: 0 0 ${theme.spacing.gutter * 2}px;
  margin: 0 0 ${theme.spacing.gutter * 2}px;
  flex: 1;

  :last-child {
    margin: 0;
    padding: 0;
  }
`;

export const Detail = styled.p`
  padding: 0;
  margin: 0;
  letter-spacing: 0.46px;
  line-height: 20px;

  ${props => props.theme.breakpoints.tablet`
    margin-bottom: ${theme.spacing.gutter / 4}px;
  `}

  :last-child {
    border: 0;
    margin: 0;
  }
`;

export const AdditionalInfo = styled.div``;

export const Button = styled.a`
  display: block;
  cursor: pointer;
  color: ${theme.palette.primary};
  font-size: ${theme.fonts.sizes.default}px;
  font-weight: ${theme.fonts.bold};
  text-transform: uppercase;
  line-height: 14px;
  letter-spacing: 0.38px;

  :before {
    content: '+ ';
  }
`;

export const Brochures = styled.div`
  text-align: right;
`;

export const MoreInfoToolTip = styled(ToolTip)``;

export const Limits = styled.ul``;

export const Limit = styled.li`
  font-size: ${theme.fonts.sizes.default}px;
  line-height: 14px;
  letter-spacing: 0.38px;
  margin-bottom: ${theme.spacing.gutter / 2}px;
`;

export const EndColumn = styled(Column)`
  align-self: flex-end;
`;

export const Total = styled.p`
  display: block;
  color: ${theme.palette.secondary};
  font-size: 1.4em;
  letter-spacing: 1.62px;
  line-height: 20px;
  padding: 0;
  margin: 0 0 ${theme.spacing.gutter * 2.5}px;

  ${({ ['data-secondary']: secondary }) =>
    secondary &&
    css`
      font-size: 1.2em;
      color: ${theme.palette.light};
      text-decoration: line-through;
    `}

  ${({ ['data-discounted']: secondary }) =>
    secondary &&
    css`
      margin: 0 0 ${theme.spacing.gutter * 1.4}px;
      color: ${theme.colors['red-fade']};
    `}
`;

export const AccommodationOffer = styled.p`
  text-transform: uppercase;
  font-size: 14px;
  text-align: right;
  color: ${theme.colors['red-fade']};
`;

export const AvailableToHoldBadge = styled.div`
  text-transform: uppercase;
  color: ${theme.palette.light};
  position: absolute;
  z-index: 1;
  background: ${theme.colors.white};
  padding: 0.5em;
  margin-left: 1em;
  margin-top: 1em;
  font-size: 14px;
`;
