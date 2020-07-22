module.exports = {
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        outputPath: "./report/tests/report.html",
        pageTitle: "Unit Test Report",
      },
    ],
  ],
  collectCoverage: true,
  collectCoverageFrom: ["**/*.js"],
  coverageDirectory: "./report/coverage",
  coverageReporters: ["text", "html"],
  testMatch: ["**/__tests__/**/*.js"],
  coveragePathIgnorePatterns: [".aws-sam", "./*.config.js", "./report"],
  testEnvironment: "node",
};
