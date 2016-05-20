///<reference path="../../typings/index.d.ts" />

// Nullroute the default creation of the KeystrokeTracker.
// Actual imports.
import createSpyObj = jasmine.createSpyObj;
import {KeystrokeTracker} from "../main/js/KeystrokeTracker";

describe("KeystrokeTracker", function() {
    let eventCall: (event: any) => void = null;
    let port: any = null;
    beforeEach(function() {
        // Capture any added eventlisteners.
        document.addEventListener = function (ev: string, func: (event: any) => void) {
            eventCall = func;
        };
        this.tracker = new KeystrokeTracker();
        spyOn(this.tracker, "sendData").and.callThrough();

        port = createSpyObj("Port", ["postMessage"]);
        spyOn(chrome.runtime, "connect").and.returnValue(port);
    });

    let testArray = [
        {name: "five", keyCode: 53, result: "5"},
        {name: "@", keyCode: 64, result: "@"},
        {name: "A", keyCode: 65, result: "A"},
        {name: "a", keyCode: 97, result: "a"},
        {name: "backspace", keyCode: 8, result: "[Backspace]"},
        {name: "tab", keyCode: 9, result: "[Tab]"},
        {name: "enter", keyCode: 13, result: "[Enter]"},
        {name: "shift", keyCode: 16, result: "[Shift]"},
        {name: "control", keyCode: 17, result: "[Control]"},
        {name: "alt", keyCode: 18, result: "[Alt]"},
        {name: "caps lock", keyCode: 20, result: "[Caps Lock]"},
        {name: "escape", keyCode: 27, result: "[Escape]"},
        {name: "space", keyCode: 32, result: "[Space]"},
        {name: "page up", keyCode: 33, result: "[Page Up]"},
        {name: "page down", keyCode: 34, result: "[Page Down]"},
        {name: "end", keyCode: 35, result: "[End]"},
        {name: "home", keyCode: 36, result: "[Home]"},
        {name: "insert", keyCode: 45, result: "[Insert]"},
        {name: "delete", keyCode: 46, result: "[Delete]"}
    ];

    testArray.forEach( function(item) {
        it("should log a key press after the 'keyup' event with the '" + item.name + "' key.", function() {
            this.tracker.register();

            // Mock date, because of ms differences.
            spyOn(Date, "now").and.returnValue(42);
            eventCall({keyBoardEvent: "keyup", keyCode: item.keyCode});
            expect(port.postMessage).toHaveBeenCalledWith({
                table: "keystroke-events/",
                data: {
                    created_at: Date.now(),
                    keyName: item.result,
                    session: ""
                }
            });
        });
    });
});
