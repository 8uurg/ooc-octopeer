///<reference path="../../../../../typings/index.d.ts" />

import createSpyObj = jasmine.createSpyObj;
import {MousePositionTracker} from "../../../../main/js/trackers/RawDataTrackers/MousePositionTracker";
import {testTracker} from "./TestTracker";

describe("The Mouse Position Tracker", function() {
    testTracker(MousePositionTracker);

    beforeEach(function(){
        jasmine.clock().install();
        jasmine.clock().mockDate();
        const _this = this;
        this.eventCall = <(event: any) => void> null;

        // Capture any added eventlisteners.
        document.addEventListener = function(ev: string, func: (event: any) => void) { _this.eventCall = func; };

        this.tracker = new MousePositionTracker();
        spyOn(this.tracker, "sendData").and.callThrough();
        this.collector = createSpyObj("TrackingCollector", ["sendMessage"]);
        this.tracker.withCollector(this.collector);
    });

    it("should call sendData with the current position of the mouse after an update", function() {
        this.tracker.register();
        jasmine.clock().mockDate();
        // Change cursor position.
        this.eventCall({
            pageX: 50,
            pageY: 100,
            clientX: 0,
            clientY: 0
        });

        expect(this.collector.sendMessage).toHaveBeenCalledWith({
            table: "mouse-position-events/",
            data: {
                position_x: 50,
                position_y: 100,
                viewport_x: 0,
                viewport_y: 0,
                created_at: Date.now() / 1000
            }
        });
    });

    it("should never throttle the amount of sendData calls.", function() {
        this.tracker.register();

        // Change cursor position.
        this.eventCall({
            pageX: 50,
            pageY: 100,
            clientX: 0,
            clientY: 0
        });

        // First call should go through.
        expect(this.collector.sendMessage).toHaveBeenCalledTimes(1);
        jasmine.clock().tick(999);

        // Change cursor position.
        this.eventCall({
            pageX: 250,
            pageY: 100,
            clientX: 0,
            clientY: 0
        });

        // Second call should not be throttled either.
        expect(this.collector.sendMessage).toHaveBeenCalledTimes(2);
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });
});
