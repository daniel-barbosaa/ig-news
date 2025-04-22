module.exports = {
testPathIgnorePatterns: ["/node_modules", "/.next"],
setupFilesAfterEnv:[
    "<rootDir>/src/tests/setupTests.ts"
],
transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
},
testEnvironment:"jsdom",
moduleNameMapper: {
    "\\.(scss|png|sass)$": "identity-obj-proxy"
},
preset: 'ts-jest',
collectCoverage: true,
colectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.test.tsx",
]
};