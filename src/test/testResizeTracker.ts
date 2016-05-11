///<reference path="../../typings/main.d.ts" />
declare var global: any;

global.window = {
    addEventListener: function() {}
};
import {ResizeTracker} from "../main/js/resizeTracker";

describe("The ResizeTracker", function() {
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
       this.tracker.register();

       // Mock current date for repeatable tests. 
       _this.date = 0;
       spyOn(Date, "now").and.callFake(function () {
           return _this.date;
       });
    });

    it("should not start sending without being triggered first.", function() {
       spyOn(this, "ev");
       jasmine.clock().tick(5000);
       expect(this.ev).not.toHaveBeenCalled();
    });

    it("should send a resize if the screen got resized.", function() {
       spyOn(this.tracker, "sendData");
       this.date = 450;
       this.ev();
       jasmine.clock().tick(400);
       expect(this.tracker.sendData).toHaveBeenCalledWith({
           width: 400,
           height: 500,
           timestamp: 450
       });
    });

    it("should not send all resize events during a resize.", function() {
       spyOn(this.tracker, "sendData");
       this.date = 450;
       this.ev();
       jasmine.clock().tick(40);
       this.date = 459;
       this.ev();
       jasmine.clock().tick(400);
       expect(this.tracker.sendData).not.toHaveBeenCalledWith({
           width: 400,
           height: 500,
           timestamp: 450
       });
       expect(this.tracker.sendData).toHaveBeenCalledWith({
           width: 400,
           height: 500,
           timestamp: 459
       });
    });

    it("should send all resize events if they are different resizes.", function() {
       spyOn(this.tracker, "sendData");
       this.date = 450;
       this.ev();
       jasmine.clock().tick(3000);
       this.date = 459;
       this.ev();
       jasmine.clock().tick(400);
       expect(this.tracker.sendData).toHaveBeenCalledWith({
           width: 400,
           height: 500,
           timestamp: 450
       });
       expect(this.tracker.sendData).toHaveBeenCalledWith({
           width: 400,
           height: 500,
           timestamp: 459
       });
    });

    afterEach(function() {
       jasmine.clock().uninstall();
    });
});