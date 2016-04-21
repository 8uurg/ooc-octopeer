/**
 * This is an example file on how to test.
 */
// Note, this is to make loading files work.
const importf = require('./__require.js');
eval(importf("reader.js"));

describe("Reader", function() {
    it("should return Hello", function() {
        expect((new Reader).flip()).toBe("Hello");
    });
    it("Should not return Hi", function() {
        expect((new Reader).flip()).not.toBe("Hi");
    })
});