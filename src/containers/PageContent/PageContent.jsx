import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { compose, isEmpty } from 'ramda';
import { useTranslation } from 'react-i18next';
import { Loader, Markdown, Sidebar } from '@pure-escapes/webapp-ui-components';

import NotFound from 'pages/NotFound';
import { useLoading } from 'effects';

import { propTypes, defaultProps } from './PageContent.props';
import connect from './PageContent.state';
import {
  StyledPageContent,
  Columns,
  ColumnLeft,
  ColumnRight,
  PageContentData,
  PageContainer,
  PageHero,
} from './PageContent.styles';

const renderNotFound = () => <NotFound />;

export const PageContent = ({ pageId, data, links, title, getPage, className, hero }) => {
  const { t } = useTranslation();

  const loadPage = useCallback(() => getPage(pageId), [getPage, pageId]);
  const loading = useLoading(loadPage, [pageId], true);

  const isLoading = !data && loading;

  if (!data && !loading) {
    return renderNotFound();
  }

  return (
    <Loader isLoading={isLoading}>
      <StyledPageContent className={className}>
        <Helmet key={title}>
          <title>
            {title || ''} - {t('title')}
          </title>
        </Helmet>
        {hero && <PageHero {...hero} />}
        <PageContainer>
          <Columns>
            <ColumnLeft>
              <Sidebar title={title}>{!isEmpty(links) && <Markdown>{links}</Markdown>}</Sidebar>
            </ColumnLeft>
            <ColumnRight>
              <PageContentData>
                <Markdown>{data}</Markdown>
              </PageContentData>
            </ColumnRight>
          </Columns>
        </PageContainer>
      </StyledPageContent>
    </Loader>
  );
};

PageContent.propTypes = propTypes;
PageContent.defaultProps = defaultProps;

export default compose(connect)(PageContent);
