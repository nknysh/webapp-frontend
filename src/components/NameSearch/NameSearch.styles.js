import styled from 'styled-components';
import { Label as UiLabel } from '@pure-escapes/webapp-ui-components';

export const Label = styled(UiLabel)`
  text-transform: uppercase;
`;

export const Searching = styled.div`
  margin: 0;
  padding: ${props => props.theme.spacing.gutter * 2}px ${props => props.theme.spacing.gutter}px;
  border-bottom: 1px solid ${props => props.theme.borders.default};
  text-transform: uppercase;
  font-weight: ${props => props.theme.fonts.bold};
  color: ${props => props.theme.palette.light};

  :last-child {
    border-bottom: 0;
  }
`;
export const ResultsSet = styled.div``;

export const Results = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  color: ${props => props.theme.palette.primary};
  background: ${props => props.theme.backgrounds.default};
  border-bottom: 1px solid ${props => props.theme.borders.default};
  text-transform: uppercase;

  :first-child {
    border-top: 0;
  }

  :last-child {
    border-bottom: 0;
  }

  :empty {
    display: none;
  }
`;

export const Result = styled.li`
  color: ${props => props.theme.colors.black};
  cursor: pointer;
  transition: ${props => props.theme.defaultTransition};
  padding: ${props => props.theme.spacing.gutter * 2}px ${props => props.theme.spacing.gutter}px;

  :last-child {
    border-bottom: 0;
  }

  :hover,
  :active {
    background: ${props => props.theme.colors.aqua};
  }
`;
