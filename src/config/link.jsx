import React from 'react';
import { map } from 'ramda';
import hash from 'object-hash';

import { theme } from 'styles';

import appleTouchIcon from 'public/assets/apple-touch-icon.png';
import favicon32 from 'public/assets/favicon-32x32.png';
import favicon16 from 'public/assets/favicon-16x16.png';
import maskIcon from 'public/assets/safari-pinned-tab.svg';
import faviconIco from 'public/assets/favicon.ico';

const materialIconFontsUrl = 'https://fonts.googleapis.com/icon?family=Material+Icons';

export const links = [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: appleTouchIcon,
  },
  {
    rel: 'icon',
    sizes: '32x32',
    href: favicon32,
  },
  {
    rel: 'icon',
    sizes: '16x16',
    href: favicon16,
  },
  {
    rel: 'mask-icon',
    href: maskIcon,
    color: theme.primary,
  },
  {
    rel: 'shortcut icon',
    href: maskIcon,
    color: faviconIco,
  },
  {
    rel: 'stylesheet',
    href: materialIconFontsUrl,
  },
];

const renderLink = props => <link key={hash(props)} {...props} />;

const rendered = map(renderLink, links);

export default rendered;
