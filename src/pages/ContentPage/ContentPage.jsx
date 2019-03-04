import React from 'react';

import { PageContent } from 'containers';

import { propTypes, defaultProps } from './ContentPage.props';

export const ContentPage = ({
  match: {
    params: { pageId },
  },
}) => <PageContent pageId={pageId} />;

ContentPage.propTypes = propTypes;
ContentPage.defaultProps = defaultProps;

export default ContentPage;
