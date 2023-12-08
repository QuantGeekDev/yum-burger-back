/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  resolver: "jest-ts-webcompat-resolver",
  clearMocks: true,
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
  errorOnDeprecated: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/server/app.ts",
    "!**/types.ts",
    "!src/setupTests.ts",
    "!src/index.ts",
    "!src/database/index.ts",
  ],
};
