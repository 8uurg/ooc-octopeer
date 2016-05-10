///<reference path="../../typings/main.d.ts" />
declare var global: any;

global.window = {
    addEventListener: function() {}
};
import {ResizeTracker} from "../main/js/resizeTracker";

describe("The ResizeTracker", function() {

    beforeEach(function () {
        jasmine.clock().install();
    });

    it("should not start sending without being triggered first.", function() {
       let tracker = new ResizeTracker();
       let ev: (e: any) => void = null;
       global.window = {
           addEventListener: function(eventName: string, callback: (e: any) => void) {
               ev = callback;
           }
       };
       tracker.register();
       this.ev = ev;
       spyOn(this, "ev");
       jasmine.clock().tick(5000);
       expect(this.ev).not.toHaveBeenCalled();
    });

    it("should send a resize if the screen got resized.", function() {
       let tracker = new ResizeTracker();
       let ev: (e: any) => void = null;
       global.window = {
           addEventListener: function(eventName: string, callback: (e: any) => void) {
               ev = callback;
           },
           innerWidth: 400,
           innerHeight: 500
       };
       tracker.register();
       spyOn(tracker, "sendData");
       ev({
           timeStamp: 450
       });
       jasmine.clock().tick(400);
       expect(tracker.sendData).toHaveBeenCalledWith({
           width: 400,
           height: 500,
           timestamp: 450
       });
    });

    it("should not send all resize events during a resize.", function() {
       let tracker = new ResizeTracker();
       let ev: (e: any) => void = null;
       global.window = {
           addEventListener: function(eventName: string, callback: (e: any) => void) {
               ev = callback;
           },
           innerWidth: 400,
           innerHeight: 500
       };
       tracker.register();
       spyOn(tracker, "sendData");
       ev({
           timeStamp: 450
       });
       jasmine.clock().tick(40);
       ev({
           timeStamp: 459
       });
       jasmine.clock().tick(400);
       expect(tracker.sendData).not.toHaveBeenCalledWith({
           width: 400,
           height: 500,
           timestamp: 450
       });
       expect(tracker.sendData).toHaveBeenCalledWith({
           width: 400,
           height: 500,
           timestamp: 459
       });
    });

    afterEach(function() {
       jasmine.clock().uninstall();
    });
});