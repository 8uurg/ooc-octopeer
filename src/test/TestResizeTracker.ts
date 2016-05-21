///<reference path="../../typings/index.d.ts" />
import createSpyObj = jasmine.createSpyObj;
import {ResizeTracker} from "../main/js/ResizeTracker";

describe("The ResizeTracker", function() {
    let port: any;

    beforeEach(function () {
        jasmine.clock().install();
        this.tracker = new ResizeTracker();
        this.ev = <(e: any) => void> null;
        let _this = this;
        window.addEventListener = function(eventName: string, callback: (e: any) => void) {
            _this.ev = callback;
        };
        spyOn(this.tracker, "sendData").and.callThrough();
        port = createSpyObj("Port", ["postMessage"]);
        spyOn(chrome.runtime, "connect").and.returnValue(port);
        // Mock current date for repeatable tests. 
        _this.date = 0;
        spyOn(Date, "now").and.callFake(function () {
            return _this.date;
        });
    });

    it("should not start sending without being triggered first.", function() {
        this.tracker.register();
        spyOn(this, "ev");
        jasmine.clock().tick(5000);
        expect(this.ev).not.toHaveBeenCalled();
    });

    it("should send a resize if the screen got resized.", function() {
        this.tracker.register();
        this.date = 450;
        this.ev();
        jasmine.clock().tick(200);
        // Ensure that the timestamp is the time of the event.
        // And not the time of sending.
        this.date = 650;
        jasmine.clock().tick(200);
        expect(port.postMessage).toHaveBeenCalledWith({
            table: "window_resolution/",
                data: {
                    width: 400,
                    height: 500,
                    created_at: 450
                }
       });
    });

    it("should not send all resize events during a resize.", function() {
        this.tracker.register();
        this.date = 450;
        this.ev();
        jasmine.clock().tick(40);
        this.date = 490;
        this.ev();
        jasmine.clock().tick(400);

        expect(port.postMessage).not.toHaveBeenCalledWith({
            table: "window_resolution/",
            data: {
                width: 400,
                height: 500,
                created_at: 450
            }
        });
        expect(port.postMessage).toHaveBeenCalledWith({
            table: "window_resolution/",
            data: {
                width: 400,
                height: 500,
                created_at: 490
            }
        });
    });

    it("should send all resize events if they are different resizes.", function() {
        this.tracker.register();
        this.date = 450;
        this.ev();
        jasmine.clock().tick(3000);
        this.date = 459;
        this.ev();
        jasmine.clock().tick(400);

         expect(port.postMessage).toHaveBeenCalledWith({
             table: "window_resolution/",
             data: {
                width: 400,
                height: 500,
                created_at: 450
             }
        });
        expect(port.postMessage).toHaveBeenCalledWith({
            table: "window_resolution/",
            data: {
                width: 400,
                height: 500,
                created_at: 459
            }
        });
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });
});