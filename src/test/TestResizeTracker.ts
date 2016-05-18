///<reference path="../../typings/index.d.ts" />
declare var global: any;

global.window = {
    addEventListener: function() {}
};

import createSpyObj = jasmine.createSpyObj;
import {ResizeTracker} from "../main/js/resizeTracker";

describe("The ResizeTracker", function() {
    let port: any;

    beforeEach(function () {
        jasmine.clock().install();
        this.tracker = new ResizeTracker();
        this.ev = <(e: any) => void> null;
        let _this = this;
        global.window = {
            addEventListener: function(eventName: string, callback: (e: any) => void) {
                _this.ev = callback;
            },
            innerWidth: 400,
            innerHeight: 500
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
        jasmine.clock().tick(400);
        expect(port.postMessage).toHaveBeenCalledWith({
            table: "window_resolution/",
                data: {
                    width: 400,
                    height: 500,
                    created_at: 450,
                    session: ""
                }
       });
    });

    it("should not send all resize events during a resize.", function() {
        this.tracker.register();

        this.date = 450;
        this.ev();
        jasmine.clock().tick(40);
        this.date = 459;
        this.ev();
        jasmine.clock().tick(400);

        expect(port.postMessage).not.toHaveBeenCalledWith({
            table: "window_resolution/",
            data: {
                width: 400,
                height: 500,
                created_at: 450,
                session: ""
            }
        });
        expect(port.postMessage).toHaveBeenCalledWith({
            table: "window_resolution/",
            data: {
                width: 400,
                height: 500,
                created_at: 459,
                session: ""
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
                created_at: 450,
                session: ""
             }
        });
        expect(port.postMessage).toHaveBeenCalledWith({
            table: "window_resolution/",
            data: {
                width: 400,
                height: 500,
                created_at: 459,
                session: ""
            }
        });
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });
});