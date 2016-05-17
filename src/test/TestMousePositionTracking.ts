///<reference path="../../typings/main.d.ts" />

// Nullroute the default creation of the mousetracker.
declare var global: any;
global.document = {
    addEventListener: function() {}
};
const original_setInterval = global.setInterval;
global.setInterval = function() {};

// Actual imports.
import {MousePositionTracker} from "../main/js/mousePositionTracker";
global.setInterval = original_setInterval;

describe("The MouseTracker", function() {
    // beforeEach(function(){
    //     jasmine.clock().install();
    //     const _this = this;
    //     this.eventCall = <(event: any) => void> null;
    //
    //     // Capture any added eventlisteners.
    //     global.document.addEventListener = function(ev: string, func: (event: any) => void) { _this.eventCall = func; };
    //     this.tracker = new MousePositionTracker();
    //     this.tracker.register();
    //     spyOn(this.tracker, "sendData");
    // });
    //
    // it("should log the current position of the mouse regularily, even if the mouse hasn't moved.", function() {
    //     jasmine.clock().tick(1000);
    //     expect(this.tracker.sendData).toHaveBeenCalledTimes(1);
    //     jasmine.clock().tick(1000);
    //     expect(this.tracker.sendData).toHaveBeenCalledTimes(2);
    // });
    //
    // it("should log the current position of the mouse", function() {
    //     jasmine.clock().tick(1000);
    //     expect(this.tracker.sendData).toHaveBeenCalledWith(0, 0);
    //
    //     // Change cursor position.
    //     this.eventCall({
    //         pageX: 50,
    //         pageY: 100
    //     });
    //     jasmine.clock().tick(1000);
    //     expect(this.tracker.sendData).toHaveBeenCalledWith(50, 100);
    // });
    //
    // afterEach(function() {
    //     jasmine.clock().uninstall();
    // });
});