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

        spyOn(this.tracker, "sendData").and.callThrough();
        let port = createSpyObj("Port", ["postMessage"]);
        spyOn(chrome.runtime, "connect").and.returnValue(port);

        // Create an instance of the tracker
        this.tracker.register();

        jasmine.clock().tick(1000);
        expect(this.tracker.sendData).toHaveBeenCalled();
        expect(port.postMessage).toHaveBeenCalledWith({
            table: "mouse-position-events/",
            data: {
                position_x: -1,
                position_y: -1,
                viewport_x: -1,
                viewport_y: -1,
                session: "",
                created_at: Date.now()
            }
        });
    });

    it("should call sendData with the current position of the mouse after an update", function() {
        this.tracker = new MousePositionTracker();

        spyOn(this.tracker, "sendData").and.callThrough();
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

        jasmine.clock().tick(1000);
        expect(this.tracker.sendData).toHaveBeenCalled();
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

    afterEach(function() {
        jasmine.clock().uninstall();
    });
});