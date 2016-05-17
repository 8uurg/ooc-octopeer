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
    
    it("should log mouse clicks", function() {
        
        const _this = this;
        this.eventCall = <(event: any) => void> null;

        // Capture any added eventlisteners.
        global.document.addEventListener = function(ev: string, func: (event: any) => void) { _this.eventCall = func; };
        this.tracker = new MouseClickTracker();
        
        spyOn(this.tracker, "sendData").and.callThrough();
        let port = createSpyObj("Port", ["postMessage"]);
        spyOn(chrome.runtime, "connect").and.returnValue(port);

        this.tracker.register();
        
        expect(this.tracker.sendData).not.toHaveBeenCalled();
        expect(port.postMessage).not.toHaveBeenCalled();
    
        // Simulate a mouse click
        this.eventCall({MouseEvent: "click"});

        expect(this.tracker.sendData).toHaveBeenCalled();
        expect(port.postMessage).toHaveBeenCalled();
    });
});