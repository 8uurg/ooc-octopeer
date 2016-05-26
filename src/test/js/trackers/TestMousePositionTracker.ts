///<reference path="../../../../typings/index.d.ts" />

// Nullroute the default creation of the mousetracker.
// Actual imports.
import createSpyObj = jasmine.createSpyObj;
import {MousePositionTracker} from "../../../main/js/trackers/MousePositionTracker";


describe("The Mouse Position Tracker", function() {
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
        expect(this.collector.sendMessage).toHaveBeenCalledTimes(1);

        // Change cursor position.
        this.eventCall({
            pageX: 250,
            pageY: 100,
            clientX: 0,
            clientY: 0
        });

        // Second call should be throttled.
        expect(this.collector.sendMessage).toHaveBeenCalledTimes(1);
    });

    it("should call sendData multiple times, if there is enough time between events.", function() {
        this.tracker.register();

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

        expect(this.collector.sendMessage).toHaveBeenCalledTimes(2);
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });
});
