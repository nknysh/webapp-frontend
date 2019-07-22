import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Markdown, Button } from 'components';

import { theme, breakpoints, Heading2 } from 'styles';

export const modalStyles = {
  style: { backgroundColor: theme.backgrounds.secondary, paddingTop: theme.gutter * 4 },
};

export const StyledResults = styled.div`
  padding ${theme.gutter * 2}px;
  position: relative;
  min-height: ${theme.gutter * 100}px;

  ${breakpoints.tablet`
    padding: 0;
  `}
`;

export const ResultsTitle = styled(Heading2)`
  color: ${theme.neutral};
  display: block;
  padding: 0 0 ${theme.gutter}px;
  margin-top: ${theme.gutter}px;
  color: ${theme.neutral};
  text-transform: capitalize;
  font-weight: ${theme.fonts.bold};
  line-height: 29px;

  ${breakpoints.tablet`
    margin: ${theme.gutter}px ${theme.gutter / 2}px ${theme.gutter * 4}px;
  `}
`;

export const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Result = styled(Link)`
  cursor: pointer;
  width: 100%;

  ${breakpoints.tablet`
    flex: 0 1 50%;
    width: 50%;
  `}
`;

export const Filtering = styled.div`
  padding: ${theme.gutter}px 0;
  margin: 0 0 ${theme.gutter * 2}px;
  border-top: 1px solid ${theme.borders.default};
  border-bottom: 1px solid ${theme.borders.default};
`;

export const FiltersButton = styled(Button)`
  font-size: ${theme.fonts.sizes.normal}px;
`;

export const SearchMarkdown = styled(Markdown)`
  text-transform: uppercase;
  color: ${theme.light};
  font-weight: ${theme.fonts.bold};
  font-size: ${theme.fonts.sizes.default}px;
  padding ${theme.gutter * 2}px;

  ul {
    padding: 0;
    margin: 0 0 0 ${theme.gutter * 2}px;

    li {
      margin-bottom: ${theme.gutter}px;
    }
  }
  position: relative;

  ${breakpoints.tablet`
    position: fixed;
    top: 282px;
    background: ${theme.backgrounds.default};
    border: 1px solid ${theme.borders.medium};
    box-shadow: ${theme.boxShadows.default};

    :before {
      position: absolute;
      left: -${theme.gutter}px;
      top: ${theme.gutter * 3.5}px;
      content: '';
      width: 0; 
      height: 0; 
      border-top: ${theme.gutter}px solid transparent;
      border-bottom: ${theme.gutter}px solid transparent; 
      border-right: ${theme.gutter}px solid ${theme.borders.default}; 
    }
  `}
`;
