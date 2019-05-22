import styled from 'styled-components';

import { Select } from 'components/elements';
import Room from 'components/app/Room';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

export const StyledRooms = styled.div`
  margin: ${theme.gutter}px ${theme.gutter * 2}px;
`;

export const Title = styled.h3`
  font-size: ${theme.fonts.sizes.mid}px;
  font-weight: ${theme.fonts.bold};
  text-transform: uppercase;
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;
  line-height: 19px;
  color: ${theme.secondary};
  padding: 0;
  margin: ${theme.gutter}px 0 ${theme.gutter * 2}px;

  ${breakpoints.tablet`
    margin-bottom: 0;
  `}
`;

export const Columns = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.gutter * 2}px;
  min-height: ${theme.gutter * 4}px;

  ${breakpoints.tablet`
        flex-direction: row;
        align-items: center;
    `}
`;

export const Column = styled.div`
  ${breakpoints.tablet`
        width: 50%;
        flex: 1 1 50%;
    `}
`;

export const RoomsWrapper = styled.div`
  margin: 0 -${theme.gutter * 2}px;

  ${breakpoints.tablet`
    margin: 0;
  `}
`;

export const AmenitiesSelect = styled(Select)`
  label,
  .material-select {
    width: 100%;
  }
`;

export const StyledRoom = styled(Room)`
  margin: ${theme.gutter * 2}px ${theme.gutter}px;

  ${breakpoints.tablet`
    margin-right: 0;
    margin-left: 0;
  `}
`;

export const NoResults = styled.div`
  display: block;
  width: 100%;
  text-transform: uppercase;
  color: ${theme.borders.medium};
  font-size: ${theme.fonts.sizes.big}px;
`;
