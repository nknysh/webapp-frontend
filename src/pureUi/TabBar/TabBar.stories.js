import React, { Fragment } from 'react';

import { TabBarCompact } from './index';

export const TabBarIndexZero = () => (
  <Fragment>
    <TabBarCompact tabIndex={0}>
      <p>Tab 0</p>
      <p>Tab 1</p>
      <p>Tab 2</p>
    </TabBarCompact>
  </Fragment>
);

export const TabBarIndexOne = () => (
  <Fragment>
    <TabBarCompact tabIndex={1}>
      <p>Tab 0</p>
      <p>Tab 1</p>
      <p>Tab 2</p>
    </TabBarCompact>
  </Fragment>
);
