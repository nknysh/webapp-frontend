module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: [
    '**/src/**/*.{js,jsx,ts,tsx}',
    '!**/src/**/*stories.{js,jsx}',
    '!**/src/**/*props.{js,jsx}',
    '!**/src/{apps,components,containers,config,effects,hoc,layouts,pages,utils}/**/*index.{js,jsx}',
    '!**/src/index.{js,jsx}',
  ],
  coverageDirectory: '<rootDir>/tests/coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['jest-canvas-mock', '<rootDir>/tests/setupFramework.js'],
  modulePaths: ['src'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(md|svg|png|jpg|jpeg|mp4|ogg)$': '<rootDir>/tests/__mocks__/pathMock.js',
    '^api(.*)$': '<rootDir>/src/api$1',
    '^apps(.*)$': '<rootDir>/src/apps$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^config(.*)$': '<rootDir>/src/config$1',
    '^containers(.*)$': '<rootDir>/src/containers$1',
    '^effects(.*)$': '<rootDir>/src/effects$1',
    '^hoc(.*)$': '<rootDir>/src/hoc$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^public(.*)$': '<rootDir>/src/public$1',
    '^routing(.*)$': '<rootDir>/src/routing$1',
    '^store(.*)$': '<rootDir>/src/store$1',
    '^styles(.*)$': '<rootDir>/src/styles$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js|jsx)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': 'ts-jest',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',

      // This prevents Jest throwing errors when types are incorrect.
      // This makes life easier when testing thing like container componsnets
      // where setting up correctly typed state could be cumbersome and brittle.
      diagnostics: false,
    },
  },
};
