module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  silent: false,
  verbose: true,
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
};
