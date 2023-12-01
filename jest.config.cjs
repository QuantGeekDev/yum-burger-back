/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  testMatch: ["**/src/**/*.test.ts"],
  resolver: "jest-ts-webcompat-resolver",
  testPathIgnorePatterns: ["src/server/app.ts"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!src/server/app.ts",
    "!**/types.ts",
    "!src/setupTests.ts",
    "!src/index.ts",
    "!src/database/index.ts",
  ],
};
