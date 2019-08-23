module.exports = {
    "collectCoverageFrom": [
      "**/src/**/*.{js,jsx}",
      "!**/src/**/*stories.{js,jsx}",
      "!**/src/**/*props.{js,jsx}",
      "!**/src/{apps,components,containers,config,effects,hoc,layouts,pages,utils}/**/*index.{js,jsx}",
      "!**/src/index.{js,jsx}"
    ],
    "coverageDirectory": "<rootDir>/tests/coverage",
    "coveragePathIgnorePatterns": [
      "/node_modules/"
    ],
    "moduleDirectories": [
      "node_modules",
      "src"
    ],
    "setupFilesAfterEnv": [
      "jest-canvas-mock",
      "<rootDir>/tests/setupFramework.js"
    ],
    "modulePaths": [
      "src"
    ],
    "moduleNameMapper": {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "\\.(md|svg|png|jpg|jpeg|mp4|ogg)$": "<rootDir>/tests/__mocks__/pathMock.js"
    },
    "snapshotSerializers": [
      "enzyme-to-json/serializer"
    ]
  }