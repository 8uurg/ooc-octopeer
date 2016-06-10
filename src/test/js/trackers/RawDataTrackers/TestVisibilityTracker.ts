///<reference path="../../../../../typings/index.d.ts" />

import createSpyObj = jasmine.createSpyObj;
import {VisibilityTracker} from "../../../../main/js/trackers/RawDataTrackers/VisibilityTracker";
import {testTracker} from "./TestTracker";

describe("The Visibility Tracker", function() {
    testTracker(VisibilityTracker);

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

    it("should call sendData with the current visibility after an update (case false)", function() {
        this.tracker.register();
        this.eventCall();

        expect(this.collector.sendMessage).toHaveBeenCalledWith({
            table: "semantic-events/",
            data: {
                event_type: 402,
                element_type: 101,
                created_at: Date.now() / 1000
            }
        });
    });

    it("should call sendData with the current visibility after an update (case true)", function() {
        this.tracker.register();

        const mockglobal: any = global;
        const olddoc = mockglobal.document;

        mockglobal.document = {
            hidden: false
        };

        this.eventCall();

        mockglobal.document = olddoc;

        expect(this.collector.sendMessage).toHaveBeenCalledWith({
            table: "semantic-events/",
            data: {
                event_type: 401,
                element_type: 101,
                created_at: Date.now() / 1000
            }
        });
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });
});
