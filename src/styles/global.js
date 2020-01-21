import { createGlobalStyle } from 'styled-components';

import theme from './theme';

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

        &.hide-overflow {
            overflow: hidden;
        }
    }

    body {
        display: block;
        margin: 0;
        padding: ${theme.sizes.headerSizes.mobile}px 0 0;
        font-family: HurmeGeometricSans2, "Open Sans", sans-serif;
        height: 100%;

        ${theme.breakpoints.desktop`
            padding-top: 0;
        `}

        &.select-open {
            height: unset;
            overflow: hidden;
        }
    }

    #app {
        height: 100%;
    }

    a, a:visited {
        color: ${theme.palette.link.default};
        text-decoration: none;

        :active, :hover {
            color: ${theme.palette.link.active};
        }

        :before, :after {
            min-height: none;
        }
    }
    * {
        box-sizing: border-box;
    }

    .mt-4 { margin-top: 16px; }
    .mb-4 { margin-bottom: 16px; }
    .my-4 { margin-top: 16px; margin-bottom: 16px; }
    .pl-4 { padding-left: 16px; }
    .pr-4 { padding-right: 16px; }
    .pl-2 { padding-left: 8px; }
    .pr-2 { padding-right: 8px; }
    .pt-4 { padding-top: 16px; }
    .pb-4 { padding-bottom: 16px; }
    .w-50 { width: 50%; }
    .font-material-ui { font-family: HurmeGeometricSans2, 'Open Sans', sans-serif !important; }
    .flex { display: flex; }
    .flex-row-reverse { flex-direction: row-reverse; }
`;

export default { GlobalFonts, GlobalStyle };
