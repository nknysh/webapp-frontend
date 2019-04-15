import styled from 'styled-components';

import NumberSelect from 'components/NumberSelect';

import theme from 'styles/theme';
import { withCurrency } from 'styles/elements';
import breakpoints from 'styles/breakpoints';
import { Heading1 } from 'styles/typography';

import { CardChipSecondary } from 'styles/card';

export const StyledRoom = styled.article`
  background: ${theme.colors.whiteish};
  flex-direction: column;
  margin: ${theme.gutter * 2}px 0;

  ${breakpoints.tablet`
    display: flex;
    flex-direction: row;
  `}
`;

export const RoomImage = styled.div`
  position: relative;
  flex: 1;
  min-height: 55px;

  ${breakpoints.tablet`
        height: 300px;
        max-width: 45%;
        width: 45%;
    `}
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImgOffer = styled(CardChipSecondary)`
  position: absolute;
  top: 0;
  left: ${theme.gutter * 2}px;

  ${breakpoints.tablet`
    top: ${theme.gutter * 2}px;
  `}
`;

export const Selection = styled(NumberSelect)`
  background: rgba(161, 130, 101, 0.9);
  padding: ${theme.gutter}px;
  position: absolute;
  bottom: 0;
  width: 100%;

  .add,
  .minus {
    > span {
      background: none !important;
      font-size: 12px !important;
      line-height: 25px !important;
      font-weight: ${theme.bold};
    }
  }

  .count {
    color: ${theme.colors.white};
    font-size: 12px !important;
    width: 100% !important;
  }
`;

export const RoomInfo = styled.div`
  padding: ${theme.gutter * 2}px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Columns = styled.div`
  display: block;
  width: 100%;

  ${breakpoints.tablet`
    display: flex;
  `}
`;

export const Column = styled.div`
  ${breakpoints.tablet`
    flex: 1;
    width: 50%;
  `}
`;

export const Title = styled(Heading1)`
  font-size: 18px;
  color: ${theme.primary};
  margin: 0 0 ${theme.gutter * 2}px;
  padding: 0;
`;

export const Price = styled.div`
  margin-bottom: ${theme.gutter * 3}px;

  ${breakpoints.tablet`
    text-align: right;
    margin-bottom: 0;
  `}
`;
export const PriceAmount = styled.span`
  ${withCurrency};
  font-size: 18px;
`;
export const PriceLabel = styled.span`
  font-size: 18px;
  font-weight: ${theme.light};
  text-transform: lowercase;
`;

export const Info = styled.p`
  color: ${theme.colors['gold-neutral']};
  padding: 0 0 ${theme.gutter * 2}px;
  margin: 0 0 ${theme.gutter * 2}px;
  border-bottom: 1px solid ${theme.borderColor};
  font-size: 14px;
`;

export const Details = styled.div`
  color: ${theme.colors['gold-dark']};
  text-transform: uppercase;
  font-size: 14px;
  padding: 0 0 ${theme.gutter * 2}px;
  margin: 0 0 ${theme.gutter * 2}px;
  flex: 1;

  :last-child {
    margin: 0;
    padding: 0;
  }
`;

export const Detail = styled.p`
  padding: 0;
  margin: 0 0 ${theme.gutter * 1.5}px;

  ${breakpoints.tablet`
    margin-bottom: ${theme.gutter / 4}px;
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
  color: ${theme.primary};
  font-size: 12px;
  font-weight: ${theme.bold};
  text-transform: uppercase;

  :before {
    content: '+ ';
  }
`;

export const Brochures = styled.div`
  text-align: right;
`;
