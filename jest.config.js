module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@constants/(.*)$': '<rootDir>/src/constants/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@api/(.*)$': '<rootDir>/src/api/$1',
        '^@assets/(.*)$': '<rootDir>/src/assets/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1'
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'] // если у вас есть `setupTests.ts`
};
