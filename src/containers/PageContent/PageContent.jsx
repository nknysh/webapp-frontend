import React, { useEffect, useState } from 'react';
import { compose, defaultTo, pipe } from 'ramda';

import { NotFound } from 'pages';

import { renderMarkdown } from 'utils/markdown';

import { propTypes, defaultProps } from './PageContent.props';
import connect from './PageContent.state';
import {
  StyledPageContent,
  PageContentHeader,
  Columns,
  ColumnLeft,
  ColumnRight,
  PageContentLinks,
  PageContentData,
  PageContainer,
  PageHero,
} from './PageContent.styles';

const renderOrDefault = pipe(
  defaultTo(''),
  renderMarkdown
);

const renderNotFound = () => <NotFound />;

export const PageContent = ({ pageId, data, links, title, getPage, className, hero }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPage(pageId);
    setLoading(false);

    return () => setLoading(true);
  }, [pageId]);

  if (!data && loading) {
    return 'Loading...';
  }

  if (!data || (!data && !loading)) {
    return renderNotFound();
  }

  const dataAsHtml = renderOrDefault(data);
  const linksAsHtml = renderOrDefault(links);

  return (
    <StyledPageContent className={className}>
      {hero && <PageHero {...hero} />}
      <PageContainer>
        <Columns>
          <ColumnLeft>
            <PageContentHeader>{title}</PageContentHeader>
            <PageContentLinks dangerouslySetInnerHTML={{ __html: linksAsHtml }} />
          </ColumnLeft>
          <ColumnRight>
            <PageContentData dangerouslySetInnerHTML={{ __html: dataAsHtml }} />
          </ColumnRight>
        </Columns>
      </PageContainer>
    </StyledPageContent>
  );
};

PageContent.propTypes = propTypes;
PageContent.defaultProps = defaultProps;

export default compose(connect)(PageContent);
