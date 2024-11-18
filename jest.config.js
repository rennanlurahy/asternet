/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/build/", "/dist/"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
}
