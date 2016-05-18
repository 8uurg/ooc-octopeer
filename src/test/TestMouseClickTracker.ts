///<reference path="../../typings/index.d.ts" />

// Nullroute the default creation of the mousetracker.

declare var global: any;
global.document = {
    addEventListener: function() {}
};

// Actual imports.
import createSpyObj = jasmine.createSpyObj;
import {MouseClickTracker} from "../main/js/mouseClickTracker";

describe("The Mouse Click Tracker", function() {
    beforeEach(function() {
        const _this = this;
        this.eventCall = <(event: any) => void> null;

         // Capture any added eventlisteners.
        global.document.addEventListener = function (ev: string, func: (event: any) => void) {
            _this.eventCall = func;
        };
        this.tracker = new MouseClickTracker();
        spyOn(this.tracker, "sendData").and.callThrough();
    });

    it("should not call sendData on non clicks", function() {
        let port = createSpyObj("Port", ["postMessage"]);
        spyOn(chrome.runtime, "connect").and.returnValue(port);

        // Create an instance of the tracker
        this.tracker.register();

        // Verify that the send method has not been called yet
        expect(this.tracker.sendData).not.toHaveBeenCalled();
    });

    it("should call sendData on clicks", function() {
        let port = createSpyObj("Port", ["postMessage"]);
        spyOn(chrome.runtime, "connect").and.returnValue(port);

        // Create an instance of the tracker
        this.tracker.register();

        // Simulate a mouse click
        this.eventCall({MouseEvent: "click"});

        // Verify that the send method has been called
        expect(this.tracker.sendData).toHaveBeenCalled();
        expect(port.postMessage).toHaveBeenCalled();
    });

    it("should call sendData more often after multiple clicks", function() {
        this.tracker.register();

        // Simulate a mouse click
        this.eventCall({MouseEvent: "click"});

        // Verify that the send method has been called
        expect(this.tracker.sendData).toHaveBeenCalledTimes(1);

        // Simulate a mouse click
        this.eventCall({MouseEvent: "click"});

        // Verify that the send method has been called again
        expect(this.tracker.sendData).toHaveBeenCalledTimes(2);
    });
});