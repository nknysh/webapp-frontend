[![Build Status](https://circleci.com/gh/pure-escapes/webapp-frontend.svg?style=svg)](https://circleci.com/gh/pure-escapes/webapp-frontend) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


# Pure Escapes Webapp Frontend (webapp-frontend)

Webapp Frontend (WAFE) is the main public facing website for Pure Escapes booking portal.  

It is a custom built React/Redux single page application, built on functional principles and uses Ramda heavily.

## Installation

Standard installation using NPM

```
npm i
```

## Running WAFE

There are 2 ways to run WAFE.  Runs on  `http://localhost:8080`

### Development

Development uses `webpack-dev-server` to run an instance of the SPA locally in development mode.  To do this you can run

```
npm run dev
```

### Production

Production uses `webpack-dev-server` to run an instance of the SPA locally in production mode.  To do this you can run

```
npm run prod
```

## Building WAFE

### Development

Development will build the unminified version of the SPA to `src/dist`.

```
npm run build:dev
```

### Production

Production will build and minify the current SPA to `src/dist`.  How you run it is up to you :)

```
npm run build
```

## Storybook

Storybook is availbale for local components by running

```
npm run storybook
```

Storybook will be available on `http://localhost:9001`

## [Routing](src/routing/README.md)

## [Redux Store](src/store/README.md)