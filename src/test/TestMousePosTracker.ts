///<reference path="../../typings/index.d.ts" />

// Nullroute the default creation of the mousetracker.
import createSpyObj = jasmine.createSpyObj;
declare var global: any;
global.document = {
    addEventListener: function() {}
};
const original_setInterval = global.setInterval;
global.setInterval = function() {};

// Actual imports.
import {MousePositionTracker} from "../main/js/mousePositionTracker";
global.setInterval = original_setInterval;

describe("The MouseTracker", function() {
    beforeEach(function(){
        jasmine.clock().install();
        const _this = this;
        this.eventCall = <(event: any) => void> null;

        // Capture any added eventlisteners.
        global.document.addEventListener = function(ev: string, func: (event: any) => void) { _this.eventCall = func; };
    });

    it("should log the current position of the mouse regularily, even if the mouse hasn't moved.", function() {
        this.tracker = new MousePositionTracker();
        spyOn(this.tracker, "sendData").and.callThrough();
        this.tracker.register();

        jasmine.clock().tick(1000);
        expect(this.tracker.sendData).toHaveBeenCalledTimes(1);
        jasmine.clock().tick(1000);
        expect(this.tracker.sendData).toHaveBeenCalledTimes(2);
    });

    it("should call sendData with the current position of the mouse", function() {
        this.tracker = new MousePositionTracker();

        // Create the spies 
        spyOn(this.tracker, "sendData").and.callThrough();
        let port = createSpyObj("Port", ["postMessage"]);
        spyOn(chrome.runtime, "connect").and.returnValue(port);

        // Create an instance of the tracker
        this.tracker.register();

        jasmine.clock().tick(1000);
        expect(this.tracker.sendData).toHaveBeenCalledWith(0, 0);

        // Change cursor position.
        this.eventCall({
            pageX: 50,
            pageY: 100
        });
        jasmine.clock().tick(1000);
        expect(this.tracker.sendData).toHaveBeenCalledWith(50, 100);
        expect(port.postMessage).toHaveBeenCalled();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });
});