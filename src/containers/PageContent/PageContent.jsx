import React from 'react';
import { Helmet } from 'react-helmet';
import { compose, prop, isEmpty } from 'ramda';

import { useLoading } from 'effects';
import { AsyncNotFound } from 'pages/NotFound';
import config from 'config/ui';
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
            {title || ''} - {prop('title', config)}
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
