// jest.config.js
module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testEnvironment: 'node',
    moduleNameMapper: {
        // If you need to map the module name to a compiled output
        '^@reuther-hols/cliniquick-ui$': './dist/index.ts'
    },
    // Add other configurations here as needed
};
