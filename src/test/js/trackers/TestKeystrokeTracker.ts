///<reference path="../../../../typings/index.d.ts" />

// Nullroute the default creation of the KeystrokeTracker.
// Actual imports.
import createSpyObj = jasmine.createSpyObj;
import {KeystrokeTracker} from "../../../main/js/trackers/KeystrokeTracker";

describe("KeystrokeTracker", function() {
    let eventCalls: any = {};

    beforeEach(function() {
        jasmine.clock().install();
        jasmine.clock().mockDate();

        eventCalls = {};
        // Capture any added eventlisteners.
        document.addEventListener = function (ev: string, func: (event: any) => void) {
            eventCalls[ev] = func;
        };
        this.tracker = new KeystrokeTracker();

        this.collector = createSpyObj("TrackingCollector", ["sendMessage"]);
        this.tracker.withCollector(this.collector);
    });

    afterEach(function() {
       jasmine.clock().uninstall();
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
        it("should key up event with the '" + item.name + "' key.", function() {
            this.tracker.register();

            // Mock date, because of ms differences.
            let creationDate = Date.now() / 1000;
            eventCalls["keyup"]({ keyCode: item.keyCode });
            expect(this.collector.sendMessage).toHaveBeenCalledTimes(1);
            expect(this.collector.sendMessage).toHaveBeenCalledWith({
                table: "keystroke-events/",
                data: {
                    created_at: creationDate,
                    keystroke: item.result,
                    keystroke_type: 2
                }
            });
        });
    });

    testArray.forEach( function(item) {
        it("should log a key down event with the '" + item.name + "' key.", function() {
            this.tracker.register();

            // Mock date, because of ms differences.
            let creationDate = Date.now() / 1000;
            eventCalls["keydown"]({ keyCode: item.keyCode });
            expect(this.collector.sendMessage).toHaveBeenCalledTimes(1);
            expect(this.collector.sendMessage).toHaveBeenCalledWith({
                table: "keystroke-events/",
                data: {
                    created_at: creationDate,
                    keystroke: item.result,
                    keystroke_type: 1
                }
            });
        });
    });
});
