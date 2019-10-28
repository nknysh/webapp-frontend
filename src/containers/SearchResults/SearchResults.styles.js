import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Markdown, Button } from '@pure-escapes/webapp-ui-components';

import { theme, Heading2 } from 'styles';

export const modalStyles = {
  style: { backgroundColor: theme.backgrounds.secondary, paddingTop: theme.spacing.gutter * 4 },
};

export const StyledResults = styled.div`
  padding ${theme.spacing.gutter * 2}px;
  position: relative;
  min-height: ${theme.spacing.gutter * 100}px;

  ${props => props.theme.breakpoints.tablet`
    padding: 0;
  `}
`;

export const ResultsTitle = styled(Heading2)`
  color: ${theme.palette.neutral};
  display: block;
  padding: 0 0 ${theme.spacing.gutter}px;
  margin-top: ${theme.spacing.gutter}px;
  color: ${theme.palette.neutral};
  text-transform: capitalize;
  font-weight: ${theme.fonts.bold};
  line-height: 29px;

  ${props => props.theme.breakpoints.tablet`
    margin: ${theme.spacing.gutter}px ${theme.spacing.gutter / 2}px ${theme.spacing.gutter * 4}px;
  `}
`;

export const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ResultWrapper = styled.div`
  width: 100%;

  ${props => props.theme.breakpoints.tablet`
    flex: 0 1 50%;
    width: 50%;
  `}
`;

export const Filtering = styled.div`
  padding: ${theme.spacing.gutter}px 0;
  margin: 0 0 ${theme.spacing.gutter * 2}px;
  border-top: 1px solid ${theme.borders.default};
  border-bottom: 1px solid ${theme.borders.default};
`;

export const FiltersButton = styled(Button)`
  font-size: ${theme.fonts.sizes.normal}px;
`;

export const SearchMarkdown = styled(Markdown)`
  text-transform: uppercase;
  color: ${theme.palette.light};
  font-weight: ${theme.fonts.bold};
  font-size: ${theme.fonts.sizes.default}px;
  padding ${theme.spacing.gutter * 2}px;

  ul {
    padding: 0;
    margin: 0 0 0 ${theme.spacing.gutter * 2}px;

    li {
      margin-bottom: ${theme.spacing.gutter}px;
    }
  }
  position: relative;

  ${props => props.theme.breakpoints.tablet`
    position: fixed;
    top: 282px;
    background: ${theme.backgrounds.default};
    border: 1px solid ${theme.borders.medium};
    box-shadow: ${theme.boxShadows.default};

    :before {
      position: absolute;
      left: -${theme.spacing.gutter}px;
      top: ${theme.spacing.gutter * 3.5}px;
      content: '';
      width: 0; 
      height: 0; 
      border-top: ${theme.spacing.gutter}px solid transparent;
      border-bottom: ${theme.spacing.gutter}px solid transparent; 
      border-right: ${theme.spacing.gutter}px solid ${theme.borders.default}; 
    }
  `}
`;
