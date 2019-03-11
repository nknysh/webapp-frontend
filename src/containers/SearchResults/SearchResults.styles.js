import styled from 'styled-components';
import { Link } from 'react-router-dom';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { Button } from 'styles/elements';
import { Heading2 } from 'styles/typography';

export const StyledResults = styled.div`
  padding ${theme.gutter * 2}px;

  ${breakpoints.tablet`
    padding-top: 0;
  `}
`;

export const ResultsTitle = styled(Heading2)`
  display: block;
  padding: 0 0 ${theme.gutter}px;
  margin-top: ${theme.gutter}px;

  ${breakpoints.tablet`
    color: ${theme.colors['gold-neutral']};
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
  border-top: 1px solid ${theme.borderColor};
  border-bottom: 1px solid ${theme.borderColor};
`;

export const FiltersButton = styled(Button)`
  font-size: 12px;
`;
