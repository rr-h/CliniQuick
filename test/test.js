const { printMsg } = require('@reuther-hols/cliniquick-ui');

describe('@reuther-hols/cliniquick-ui tests', () => {

    test('printMsg should log the correct message', () => {
        // Spy on console.log to verify it is called
        const consoleSpy = jest.spyOn(console, 'log');

        // Call the function
        printMsg();

        // Check that console.log was called with the correct message
        expect(consoleSpy).toHaveBeenCalledWith("This is a message from the demo package");

        // Restore the original console.log so it can be used normally elsewhere
        consoleSpy.mockRestore();
    });

    // More tests here for other functions and components
    // For CommonJS, make sure this path resolves to where `printMsg` is defined.
    const { printMsg } = require('@reuther-hols/cliniquick-ui');


});

