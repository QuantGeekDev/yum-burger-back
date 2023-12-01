/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  testMatch: ["**/src/**/*.test.ts", "**/src/**/__tests__/*.ts"],
  resolver: "jest-ts-webcompat-resolver",
  collectCoverage: true,
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
  errorOnDeprecated: true,
  collectCoverageFrom: [
    "src/**/*.{ts}",
    "!src/server/app.ts",
    "!**/types.ts",
    "!src/setupTests.ts",
    "!src/index.ts",
    "!src/database/index.ts",
  ],
};
