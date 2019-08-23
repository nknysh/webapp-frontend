import styled from 'styled-components';
import { Label, Select, NumberSelect as BaseNumberSelect } from '@pure-escapes/webapp-ui-components';

import { theme } from 'styles';

export const Section = styled.div`
  padding: ${theme.spacing.gutter}px;
  border-bottom: 1px solid ${theme.borders.default};
`;

export const Entry = styled.div`
  display: flex;
  align-items: center;
`;

export const EntryLabel = styled(Label)`
  flex: 1;

  > span {
    font-size: ${theme.fonts.sizes.less}px !important;
  }
`;

export const NumberSelect = styled(BaseNumberSelect)`
  flex: 1;
`;

export const AgeDropDown = styled.div`
  border-top: 1px solid ${theme.backgrounds.secondary};
  border-bottom: 1px solid ${theme.backgrounds.secondary};
  display: block;
  flex: none;
  margin: ${theme.spacing.gutter}px 0;
  padding: ${theme.spacing.gutter}px 0;
  display: flex;
  flex-wrap: wrap;
`;

export const AgeDropDownTitle = styled.p`
  font-size: ${theme.fonts.sizes.normal}px;
  text-transform: uppercase;
  color: ${theme.palette.primary};
  padding: 0;
  margin: 0 0 ${theme.spacing.gutter}px;
  flex: none;
  width: 100%;
`;

export const AgeDropDownSelect = styled(Select)`  
flex: 1 1 100%;

${props => props.theme.breakpoints.tablet`
  flex: 0 1 25%;
`}

  label {
    width: 100%;
  }
  
  .material-select {
    min-width: auto;
    width: 100%;
    margin 0 ${theme.spacing.gutter / 2}px;
  }
`;
