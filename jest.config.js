const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', 'jest-localstorage-mock'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: { '^@src/(.*)$': '<rootDir>/src/$1', '^public/(.*)$': '<rootDir>/public/$1' },
  transformIgnorePatterns: ['node_modules'],
};

module.exports = createJestConfig(customJestConfig);
