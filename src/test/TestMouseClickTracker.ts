///<reference path="../../typings/index.d.ts" />

// Nullroute the default creation of the mousetracker.
import createSpyObj = jasmine.createSpyObj;
declare var global: any;
global.document = {
    addEventListener: function() {}
};

// Actual imports.
import {MouseClickTracker} from "../main/js/mouseClickTracker";

describe("The MouseTracker", function() {

    it("should call sendData on clicks", function() {

        const _this = this;
        this.eventCall = <(event: any) => void> null;

        // Capture any added eventlisteners.
        global.document.addEventListener = function(ev: string, func: (event: any) => void) { _this.eventCall = func; };
        this.tracker = new MouseClickTracker();

        // Create the spies 
        spyOn(this.tracker, "sendData").and.callThrough();
        let port = createSpyObj("Port", ["postMessage"]);
        spyOn(chrome.runtime, "connect").and.returnValue(port);

        // Create an instance of the tracker
        this.tracker.register();

        // Verify that the send method has not been called yet
        expect(this.tracker.sendData).not.toHaveBeenCalled();
        expect(port.postMessage).not.toHaveBeenCalled();

        // Simulate a mouse click
        this.eventCall({MouseEvent: "click"});

        // Verify that the send method has been called
        expect(this.tracker.sendData).toHaveBeenCalled();
        expect(port.postMessage).toHaveBeenCalled();
    });
});