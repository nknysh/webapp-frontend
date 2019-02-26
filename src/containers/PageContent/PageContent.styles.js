import styled from 'styled-components';

import theme from 'styles/theme';
import { Container } from 'styles/elements';
import { Heading1 } from 'styles/typography';

import { Hero } from 'components/Hero';

const fiveSpaced = theme.gutter * 5;
const doubleSpaced = theme.gutter * 2;

export const StyledPageContent = styled.div`
  color: ${theme.colors['gold-neutral']};
  width: 100%;
`;

export const PageHero = styled(Hero)`
  margin-bottom: ${fiveSpaced}px;
`;

export const PageContainer = styled(Container)``;

export const PageContentHeader = styled(Heading1)`
  margin: 0;
  padding: 0 0 ${theme.gutter * 3}px;
  border-bottom: 1px solid ${theme.colors['gray-medium']};
`;

export const PageContentLinks = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: ${doubleSpaced}px 0;
      color: ${theme.primary};
      border-bottom: 1px solid ${theme.colors['gray-medium']};

      &:last-child {
        border-bottom: 0;
      }

      a {
        color: ${theme.primary};
        font-size: 11px;
        text-transform: uppercase;
      }
    }
  }
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
    border-bottom: 1px solid ${theme.colors.gray};
  }

  h2,
  h3 {
    color: ${theme.primary};
  }

  h2 {
    margin: 0 0 ${doubleSpaced}px;
    padding: 0 0 ${doubleSpaced}px;
    border-bottom: 1px solid ${theme.colors['gray-medium']};
    min-height: 35px;
  }

  .list-grid {
    ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;

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
  display: flex;
`;

export const ColumnLeft = styled.div`
  flex: 1 1 25%;
  padding-right: ${theme.gutter * 15}px;
`;

export const ColumnRight = styled.div`
  flex: 1 1 50%;
  padding-bottom: ${fiveSpaced}px;
`;
