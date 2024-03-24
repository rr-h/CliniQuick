// printMsg.test.js

const { printMsg } = require('@reuther-hols/cliniquick-ui');

describe('@reuther-hols/cliniquick-ui tests', () => {

    test('printMsg should log the correct message', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        printMsg();
        expect(consoleSpy).toHaveBeenCalledWith("This is a message from the demo package");
        consoleSpy.mockRestore();
    });

    // More tests...
});
