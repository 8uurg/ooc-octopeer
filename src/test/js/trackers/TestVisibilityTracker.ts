///<reference path="../../../../typings/index.d.ts" />

// Nullroute the default creation of the visibilitytracker.
// Actual imports.
import createSpyObj = jasmine.createSpyObj;
import {VisibilityTracker} from "../../../main/js/trackers/VisibilityTracker";


describe("The Mouse Position Tracker", function() {
    beforeEach(function(){
        jasmine.clock().install();
        jasmine.clock().mockDate();
        const _this = this;
        this.eventCall = <(event: any) => void> null;

        // Capture any added eventlisteners.
        document.addEventListener = function(ev: string, func: (event: any) => void) { _this.eventCall = func; };

        this.tracker = new VisibilityTracker();
        spyOn(this.tracker, "sendData").and.callThrough();
        this.collector = createSpyObj("TrackingCollector", ["sendMessage"]);
        this.tracker.withCollector(this.collector);
    });

    it("should call sendData with the current visiblity after an update", function() {
        this.tracker.register();
        jasmine.clock().mockDate();
        
        this.eventCall({
        });

        expect(this.collector.sendMessage).toHaveBeenCalledWith({
            table: "semantic-events/",
            data: {
                event_type: 402,
                element_type: -1,
                started_at: Date.now(),
                duration: 0
            }
        });
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });
});
