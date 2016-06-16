///<reference path="../../../../../typings/index.d.ts" />

import createSpyObj = jasmine.createSpyObj;
import {MouseClickTracker} from "../../../../main/js/trackers/RawDataTrackers/MouseClickTracker";
import {testTracker} from "./TestTracker";

describe("The Mouse Click Tracker", function() {
    testTracker(MouseClickTracker);

    beforeEach(function() {
        const _this = this;
        jasmine.clock().install();
        jasmine.clock().mockDate();
        this.eventCall = <(event: any) => void> null;
        this.mousePositionObject = {
            pageX: 15,
            pageY: 25,
            clientX: 15,
            clientY: 25
        };
        this.anotherMousePositionObject = {
            pageX: 15,
            pageY: 25,
            clientX: 15,
            clientY: 25
        };
         // Capture any added eventlisteners.
        document.addEventListener = function (ev: string, func: (event: any) => void) {
            _this.eventCall = func;
        };
        this.tracker = new MouseClickTracker();
        spyOn(this.tracker, "sendData").and.callThrough();
        this.collector = createSpyObj("TrackingCollector", ["sendMessage"]);
        this.tracker.withCollector(this.collector);
    });

    it("should not call sendData on non clicks", function() {
        // Create an instance of the tracker
        this.tracker.register();

        // Verify that the send method has not been called yet
        expect(this.collector.sendMessage).not.toHaveBeenCalled();
    });

    it("should call sendData on clicks", function() {
        // Create an instance of the tracker
        this.tracker.register();

        // Simulate a mouse click
        this.eventCall(this.mousePositionObject);

        // Verify that the send method has been called
        expect(this.collector.sendMessage).toHaveBeenCalledWith(
            jasmine.objectContaining({
                data: {
                    created_at: Date.now() / 1000
                }
            })
        );
        expect(this.collector.sendMessage).toHaveBeenCalledWith(
            jasmine.objectContaining({
                data: {
                    position_x: this.mousePositionObject.pageX,
                    position_y: this.mousePositionObject.pageY,
                    viewport_x: this.mousePositionObject.clientX,
                    viewport_y: this.mousePositionObject.clientY,
                    created_at: Date.now() / 1000
                }
            })
        );
    });

    it("should call sendData more often after multiple clicks", function() {
        this.tracker.register();

        // Simulate mouse clicks
        this.eventCall(this.mousePositionObject);
        this.eventCall(this.anotherMousePositionObject);

        // Verify that the send method has been called again
        expect(this.collector.sendMessage).toHaveBeenCalledTimes(4);
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });
});
