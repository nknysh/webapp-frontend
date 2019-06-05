import React from 'react';
import { Helmet } from 'react-helmet';
import { compose, isEmpty } from 'ramda';
import { useTranslation } from 'react-i18next';

import { AsyncNotFound } from 'pages/NotFound';
import { useLoading } from 'effects';
import { Markdown, Sidebar, Loader } from 'components';

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

const renderNotFound = () => <AsyncNotFound />;

export const PageContent = ({ pageId, data, links, title, getPage, className, hero }) => {
  const { t } = useTranslation();

  const loadPage = () => getPage(pageId);
  const loading = useLoading(loadPage, [pageId], true);

  const isLoading = !data && loading;

  if (!data && !loading) {
    return renderNotFound();
  }

  return (
    <Loader isLoading={isLoading}>
      <StyledPageContent className={className}>
        <Helmet>
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
