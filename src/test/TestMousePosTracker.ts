///<reference path="../../typings/index.d.ts" />

// Nullroute the default creation of the mousetracker.

declare var global: any;
global.document = {
    addEventListener: function() {}
};

const original_setInterval = global.setInterval;
global.setInterval = function() {};
global.setInterval = original_setInterval;

// Actual imports.
import createSpyObj = jasmine.createSpyObj;
import {MousePositionTracker} from "../main/js/mousePositionTracker";


describe("The Mouse Position Tracker", function() {
    beforeEach(function(){
        jasmine.clock().install();
        const _this = this;
        this.eventCall = <(event: any) => void> null;

        // Capture any added eventlisteners.
        global.document.addEventListener = function(ev: string, func: (event: any) => void) { _this.eventCall = func; };

        this.tracker = new MousePositionTracker();
        spyOn(this.tracker, "sendData").and.callThrough();
    });

    it("should call sendData with the current position of the mouse after an update", function() {
        let port = createSpyObj("Port", ["postMessage"]);
        spyOn(chrome.runtime, "connect").and.returnValue(port);

        // Create an instance of the tracker
        this.tracker.register();

        // Change cursor position.
        this.eventCall({
            pageX: 50,
            pageY: 100,
            clientX: 0,
            clientY: 0
        });

        expect(port.postMessage).toHaveBeenCalledWith({
            table: "mouse-position-events/",
            data: {
                position_x: 50,
                position_y: 100,
                viewport_x: 0,
                viewport_y: 0,
                session: "",
                created_at: Date.now()
            }
        });
    });

    it("should throttle the amount of sendData calls, if events occur too fast.", function() {
        this.tracker.register();

        // Change cursor position.
        this.eventCall({
            pageX: 50,
            pageY: 100,
            clientX: 0,
            clientY: 0
        });

        // First call should go through.
        expect(this.tracker.sendData).toHaveBeenCalledTimes(1);

        // Change cursor position.
        this.eventCall({
            pageX: 250,
            pageY: 100,
            clientX: 0,
            clientY: 0
        });

        // Second call should be throttled.
        expect(this.tracker.sendData).toHaveBeenCalledTimes(1);
    });

    it("should call sendData multiple times, if there is enough time between events.", function() {
        this.tracker.register();
        jasmine.clock().mockDate(Date.prototype);

        // Change cursor position.
        this.eventCall({
            pageX: 50,
            pageY: 100,
            clientX: 0,
            clientY: 0
        });

        // Pass a sufficient amount of time.
        jasmine.clock().tick(3000);

        // Change cursor position.
        this.eventCall({
            pageX: 250,
            pageY: 100,
            clientX: 0,
            clientY: 0
        });

        expect(this.tracker.sendData).toHaveBeenCalledTimes(2);
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });
});
