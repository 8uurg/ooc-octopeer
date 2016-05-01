///<reference path="../../typings/main.d.ts" />
import {Reader} from '../main/ts/reader';

/**
 * This is an example file on how to test.
 */

describe("Reader", function() {
    it("should return Hello", function() {
        expect((new Reader).flip()).toBe("Hello");
    });
    it("Should not return Hi", function() {
        expect((new Reader).flip()).not.toBe("Hi");
    })
});
