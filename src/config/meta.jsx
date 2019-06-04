import React from 'react';
import { map } from 'ramda';
import hash from 'object-hash';
import i18n from 'config/i18n';

import theme from 'styles/theme';

import msApplicationConfig from 'public/browserconfig.xml';

export const meta = [
  {
    name: 'Description',
    content: i18n.t('description'),
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
