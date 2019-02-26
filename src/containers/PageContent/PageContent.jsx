import React, { useEffect, useState } from 'react';
import { compose } from 'ramda';

import { NotFound } from 'pages';

import { Markdown } from 'components';

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

  return (
    <StyledPageContent className={className}>
      {hero && <PageHero {...hero} />}
      <PageContainer>
        <Columns>
          <ColumnLeft>
            <PageContentHeader>{title}</PageContentHeader>
            <PageContentLinks>
              <Markdown>{links}</Markdown>
            </PageContentLinks>
          </ColumnLeft>
          <ColumnRight>
            <PageContentData>
              <Markdown>{data}</Markdown>
            </PageContentData>
          </ColumnRight>
        </Columns>
      </PageContainer>
    </StyledPageContent>
  );
};

PageContent.propTypes = propTypes;
PageContent.defaultProps = defaultProps;

export default compose(connect)(PageContent);
