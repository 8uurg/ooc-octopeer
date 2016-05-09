///<reference path="../../typings/main.d.ts" />

// Nullroute the default creation of the mousetracker.
declare var global: any;
global.document = {};
global.document.addEventListener = function() {};
var original_setInterval = global.setInterval;
global.setInterval = function() {};

// Actual imports.
import {MouseTracker} from '../main/js/mouseTracker';
global.setInterval = original_setInterval;

describe("The MouseTracker", function() {
    beforeEach(function(){
        jasmine.clock().install();
    });
    
    it("should log the current position of the mouse regularily", function() {
        // Capture any added eventlisteners.
        global.document.addEventListener = function() {};
        var tracker = new MouseTracker();
        tracker.register();
        spyOn(tracker, "sendData");
        jasmine.clock().tick(1000);
        expect(tracker.sendData).toHaveBeenCalledTimes(1);
        jasmine.clock().tick(1000);
        expect(tracker.sendData).toHaveBeenCalledTimes(2);
    });
   
    it("should log the current position of the mouse", function() {
        var eventCall: (event: any) => void = null;
        // Capture any added eventlisteners.
        global.document.addEventListener = function(ev: string, func: (event: any) => void) { eventCall = func; };
        var tracker = new MouseTracker();
        tracker.register();
        spyOn(tracker, "sendData");
        jasmine.clock().tick(1000);
        expect(tracker.sendData).toHaveBeenCalledWith(0, 0);
        
        // Change cursor position.
        eventCall({
            pageX: 50,
            pageY: 100
        });
        jasmine.clock().tick(1000);
        expect(tracker.sendData).toHaveBeenCalledWith(50, 100);
    });
   
    afterEach(function() {
        jasmine.clock().uninstall();
    }); 
});