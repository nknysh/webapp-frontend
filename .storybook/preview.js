import React, { Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';
import { addDecorator } from '@storybook/react';

import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle, GlobalFonts } from '../src/styles';

import '../src/styles/fonts/HurmeGeometricSans2.css';
import '../src/styles/fonts/NoeDisplay.css';

import '../src/config/i18n';

export const StorybookStyle = createGlobalStyle`
  body {
    padding: 25px;
  }
`;

addDecorator(
  storyFn => 
    <ThemeProvider theme={theme}>
      <GlobalFonts/>
      <GlobalStyle />
      <StorybookStyle />
      {storyFn()}
    </ThemeProvider>
);
