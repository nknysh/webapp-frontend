import styled from 'styled-components';
import { Container, Hero } from '@pure-escapes/webapp-ui-components';

import { theme, h3Styling, h2Styling, h4Styling, h5Styling, pStyling } from 'styles';

const fiveSpaced = theme.spacing.gutter * 5;
const doubleSpaced = theme.spacing.gutter * 2;
const pageGutter = `${doubleSpaced}px`;

export const StyledPageContent = styled.div`
  color: ${theme.palette.neutral};
  width: 100%;
`;

export const PageHero = styled(Hero)`
  min-height: 140px;

  ${props => props.theme.breakpoints.tablet`
    margin-bottom: ${fiveSpaced}px;
    min-height: 350px;
  `}
`;

export const PageContainer = styled(Container)`
  padding: ${pageGutter};
`;

/**
 * @todo Temporary format some internal markup from markdown.
 *       Look how to control styling in a more modular way.
 */
export const PageContentData = styled.div`
  hr {
    border: 0;
    background: 0;
    outline: 0;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid ${theme.borders.normal};
  }

  a,
  a:visited,
  a:active,
  a:hover {
    color: ${theme.palette.secondary};
    font-weight: ${theme.fonts.bold};
    text-decoration: underline;
    text-transform: uppercase;
  }

  h2 {
    ${h2Styling}
  }

  h3 {
    ${h3Styling}
    font-size: ${theme.fonts.sizes.normal}px;
  }

  h4 {
    ${h4Styling}
    font-size: ${theme.fonts.sizes.normal}px;
  }

  h5 {
    ${h5Styling}
    font-size: ${theme.fonts.sizes.normal}px;
  }

  p {
    ${pStyling}
    line-height: ${doubleSpaced}px;
    font-size: ${theme.fonts.sizes.normal}px;
    color: ${theme.palette.neutral};
  }

  h2 {
    :not(:empty) {
      margin: ${theme.spacing.gutter}px 0 ${doubleSpaced * 2}px;
      padding: ${doubleSpaced * 2}px 0;
      border-bottom: 1px solid ${theme.borders.medium};
      font-size: ${theme.fonts.sizes.bigger}px;
    }

    ${props => props.theme.breakpoints.tablet`
      min-height: ${theme.spacing.gutter * 6}px;
      padding: ${theme.spacing.gutter}px 0;
      border-bottom: 1px solid ${theme.borders.medium};
      
      :not(:empty), :empty{
        padding: ${theme.spacing.gutter}px 0;
        margin-top: 0;
      }
    `}
  }

  h3 {
    margin: ${doubleSpaced * 2}px 0 ${doubleSpaced}px;
    padding: 0;
  }

  .list-grid {
    ul {
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;

      ${props => props.theme.breakpoints.tablet`
        display: flex;
      `}

      li {
        flex: 1 1 50%;
        margin: 0 0 ${theme.spacing.gutter * 4}px;
        padding: 0;

        h4 {
          color: ${theme.palette.primary};
        }
      }
    }
  }
`;

export const Columns = styled.div`
  display: block;

  ${props => props.theme.breakpoints.tablet`
    display: flex;
  `}
`;

export const ColumnLeft = styled.div`
  ${props => props.theme.breakpoints.tablet`
    flex: 1 1 25%;
    padding-right: ${theme.spacing.gutter * 13}px;
  `}
`;

export const ColumnRight = styled.div`
  ${props => props.theme.breakpoints.tablet`
  flex: 1 1 50%;
  padding-bottom: ${fiveSpaced}px;
`}
`;
