///<reference path="../../typings/index.d.ts" />
import createSpyObj = jasmine.createSpyObj;
import {ResizeTracker} from "../main/js/trackers/ResizeTracker";

describe("The ResizeTracker", function() {

    beforeEach(function () {
        jasmine.clock().install();
        // Mock current date for repeatable tests. 
        jasmine.clock().mockDate();
        this.tracker = new ResizeTracker();
        this.ev = <(e: any) => void> null;
        let _this = this;
        window.addEventListener = function(eventName: string, callback: (e: any) => void) {
            _this.ev = callback;
        };
        spyOn(this.tracker, "sendData").and.callThrough();
        this.collector = createSpyObj("TrackingCollector", ["sendMessage"]);
        this.tracker.withCollector(this.collector);
    });

    it("should not start sending without being triggered first.", function() {
        this.tracker.register();
        spyOn(this, "ev");
        jasmine.clock().tick(5000);
        expect(this.ev).not.toHaveBeenCalled();
    });

    it("should send a resize if the screen got resized.", function() {
        this.tracker.register();
        this.ev();
        let creationTime = Date.now() / 1000;
        // Ensure that the timestamp is the time of the event.
        // And not the time of sending.
        jasmine.clock().tick(400);

        expect(this.collector.sendMessage).toHaveBeenCalledWith({
            table: "window-resolution-events/",
                data: {
                    width: 400,
                    height: 500,
                    created_at: creationTime
                }
       });
    });

    it("should not send all resize events during a resize.", function() {
        this.tracker.register();
        this.ev();
        let creationTime1 = Date.now() / 1000;
        jasmine.clock().tick(40);
        this.ev();
        let creationTime2 = Date.now() / 1000;
        jasmine.clock().tick(400);

        expect(this.collector.sendMessage).not.toHaveBeenCalledWith({
            table: "window-resolution-events/",
            data: {
                width: 400,
                height: 500,
                created_at: creationTime1
            }
        });
        expect(this.collector.sendMessage).toHaveBeenCalledWith({
            table: "window-resolution-events/",
            data: {
                width: 400,
                height: 500,
                created_at: creationTime2
            }
        });
    });

    it("should send all resize events if they are different resizes.", function() {
        this.tracker.register();
        this.ev();
        let creationTime1 = Date.now() / 1000;
        jasmine.clock().tick(3000);
        this.ev();
        let creationTime2 = Date.now() / 1000;
        jasmine.clock().tick(400);

         expect(this.collector.sendMessage).toHaveBeenCalledWith({
             table: "window-resolution-events/",
             data: {
                width: 400,
                height: 500,
                created_at: creationTime1
             }
        });
        expect(this.collector.sendMessage).toHaveBeenCalledWith({
            table: "window-resolution-events/",
            data: {
                width: 400,
                height: 500,
                created_at: creationTime2
            }
        });
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });
});