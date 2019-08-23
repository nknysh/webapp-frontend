import styled from 'styled-components';
import { Select } from '@pure-escapes/webapp-ui-components';

import Room from 'components/Room';

import { theme } from 'styles';

export const StyledRooms = styled.div`
  margin: ${theme.spacing.gutter}px ${theme.spacing.gutter * 2}px;
`;

export const Title = styled.h3`
  font-size: ${theme.fonts.sizes.mid}px;
  font-weight: ${theme.fonts.bold};
  text-transform: uppercase;
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;
  line-height: 19px;
  color: ${theme.palette.secondary};
  padding: 0;
  margin: ${theme.spacing.gutter}px 0 ${theme.spacing.gutter * 2}px;

  ${props => props.theme.breakpoints.tablet`
    margin-bottom: 0;
  `}
`;

export const Columns = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing.gutter * 2}px;
  min-height: ${theme.spacing.gutter * 4}px;

  ${props => props.theme.breakpoints.tablet`
        flex-direction: row;
        align-items: center;
    `}
`;

export const Column = styled.div`
  ${props => props.theme.breakpoints.tablet`
        width: 50%;
        flex: 1 1 50%;
    `}
`;

export const RoomsWrapper = styled.div`
  margin: 0 -${theme.spacing.gutter * 2}px;

  ${props => props.theme.breakpoints.tablet`
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
  margin: ${theme.spacing.gutter * 2}px ${theme.spacing.gutter}px;

  ${props => props.theme.breakpoints.tablet`
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
