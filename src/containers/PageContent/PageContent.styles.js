import styled from 'styled-components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { Container } from 'styles/elements';
import { h3Styling, h2Styling, h4Styling, h5Styling, pStyling } from 'styles/typography';

import { Hero } from 'components';

const fiveSpaced = theme.gutter * 5;
const doubleSpaced = theme.gutter * 2;
const pageGutter = `${doubleSpaced}px`;

export const StyledPageContent = styled.div`
  color: ${theme.neutral};
  width: 100%;
`;

export const PageHero = styled(Hero)`
  min-height: 140px;

  ${breakpoints.tablet`
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

  h2 {
    ${h2Styling}
  }

  h3 {
    ${h3Styling}
  }

  h4 {
    ${h4Styling}
  }

  h5 {
    ${h5Styling}
  }

  p {
    ${pStyling}
  }

  h2 {
    :not(:empty) {
      margin: ${theme.gutter}px 0 ${doubleSpaced * 2}px;
      padding: ${doubleSpaced * 2}px 0;
      border-bottom: 1px solid ${theme.borders.medium};
      font-size: ${theme.fonts.sizes.bigger}px;
    }

    ${breakpoints.tablet`
      min-height: ${theme.gutter * 6}px;
      padding: ${theme.gutter}px 0;
      border-bottom: 1px solid ${theme.borders.medium};
      
      :not(:empty), :empty{
        padding: ${theme.gutter}px 0;
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

      ${breakpoints.tablet`
        display: flex;
      `}

      li {
        flex: 1 1 50%;
        margin: 0 0 ${theme.gutter * 4}px;
        padding: 0;

        h4 {
          color: ${theme.primary};
        }
      }
    }
  }
`;

export const Columns = styled.div`
  display: block;

  ${breakpoints.tablet`
    display: flex;
  `}
`;

export const ColumnLeft = styled.div`
  ${breakpoints.tablet`
    flex: 1 1 25%;
    padding-right: ${theme.gutter * 13}px;
  `}
`;

export const ColumnRight = styled.div`
  ${breakpoints.tablet`
  flex: 1 1 50%;
  padding-bottom: ${fiveSpaced}px;
`}
`;
