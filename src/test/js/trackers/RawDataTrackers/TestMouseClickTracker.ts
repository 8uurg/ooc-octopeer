///<reference path="../../../../../typings/index.d.ts" />

import createSpyObj = jasmine.createSpyObj;
import {MouseClickTracker} from "../../../../main/js/trackers/RawDataTrackers/MouseClickTracker";
import {testTracker} from "./TestTracker";

describe("The Mouse Click Tracker", function() {
    testTracker(MouseClickTracker);

    beforeEach(function() {
        const _this = this;
        this.eventCall = <(event: any) => void> null;

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
        this.eventCall({MouseEvent: "click"});

        // Verify that the send method has been called
        expect(this.collector.sendMessage).toHaveBeenCalled();
    });

    it("should call sendData more often after multiple clicks", function() {
        this.tracker.register();

        // Simulate mouse clicks
        this.eventCall({MouseEvent: "click"});
        this.eventCall({MouseEvent: "click"});

        // Verify that the send method has been called again
        expect(this.collector.sendMessage).toHaveBeenCalledTimes(2);
    });
});