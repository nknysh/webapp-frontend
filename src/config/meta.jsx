import React from 'react';
import { map, prop } from 'ramda';
import hash from 'object-hash';

import uiConfig from 'config/ui';
import theme from 'styles/theme';

import msApplicationConfig from 'public/browserconfig.xml';

export const meta = [
  {
    name: 'Description',
    content: prop('description', uiConfig),
  },
  {
    name: 'msapplication-TileColor',
    content: theme.primary,
  },
  {
    name: 'msapplication-config',
    content: msApplicationConfig,
  },
  {
    name: 'theme-color',
    content: theme.primary,
  },
];

const renderMeta = props => <meta key={hash(props)} {...props} />;

const rendered = map(renderMeta, meta);

export default rendered;
