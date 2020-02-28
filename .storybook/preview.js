import React, { Fragment } from 'react';
import { addDecorator } from '@storybook/react';

import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle, GlobalFonts } from '../src/styles';

import '../src/styles/fonts/HurmeGeometricSans2.css';
import '../src/styles/fonts/NoeDisplay.css';

import '../src/config/i18n';

addDecorator(
  storyFn => 
    <ThemeProvider theme={theme}>
      <GlobalFonts/>
      <GlobalStyle />
      {storyFn()}
    </ThemeProvider>
);
