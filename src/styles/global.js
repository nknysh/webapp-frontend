import { createGlobalStyle } from 'styled-components';

import theme from './theme';
import breakpoints from './breakpoints';

export const GlobalFonts = createGlobalStyle`
    @font-face {
        font-display: auto;
        font-family: HurmeGeometricSans2;
        font-weight: 900;
        src: local('HurmeGeometricSans2-Black'), url(./assets/HurmeGeometricSans2-Black.otf);
    }

    @font-face {
        font-display: auto;
        font-family: HurmeGeometricSans2;
        font-weight: 700;
        src: local('HurmeGeometricSans2-Bold'), url(./assets/HurmeGeometricSans2-Bold.otf);
    }

    @font-face {
        font-display: auto;
        font-family: HurmeGeometricSans2;
        font-weight: 600;
        src: local('HurmeGeometricSans2-SemiBold'), url(./assets/HurmeGeometricSans2-SemiBold.otf);
    }

    @font-face {
        font-display: auto;
        font-family: HurmeGeometricSans2;
        font-weight: 400;
        src: local('HurmeGeometricSans2-Regular'), url(./assets/HurmeGeometricSans2-Regular.otf);
    }

    @font-face {
        font-display: auto;
        font-family: HurmeGeometricSans2;
        font-weight: 300;
        src: local('HurmeGeometricSans2-Light'), url(./assets/HurmeGeometricSans2-Light.otf);
    }

    @font-face {
        font-display: auto;
        font-family: HurmeGeometricSans2;
        font-weight: 200;
        src: local('HurmeGeometricSans2-Thin'), url(./assets/HurmeGeometricSans2-Thin.otf);
    }

    @font-face {
        font-display: auto;
        font-family: HurmeGeometricSans2;
        font-weight: 100;
        src: local('HurmeGeometricSans2-Hairline'), url(./assets/HurmeGeometricSans2-Hairline.otf);
    }
`;

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
        overflow: auto;
    }

    body {
        display: block;
        margin: 0;
        padding: ${theme.headerSizes.mobile}px 0 0;
        font-family: HurmeGeometricSans2, "Open Sans", sans-serif;
        height: 100%;

        ${breakpoints.desktop`
            padding-top: 0;
        `}
    }

    #app {
        height: 100%;
    }

    a {
        text-decoration: none;

        :before, :after {
            min-height: none;
        }
    }
    * {
        box-sizing: border-box;
    }
`;

export default { GlobalFonts, GlobalStyle };
