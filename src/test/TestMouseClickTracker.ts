/**
 * Created by Thomas on 17-5-2016.
 */


// Nullroute the default creation of the mousetracker.
declare var global: any;
global.document = {
    addEventListener: function() {}
};
const original_setInterval = global.setInterval;
global.setInterval = function() {};

// Actual imports.
import {MouseClickTracker} from "../main/js/mouseClickTracker";
global.setInterval = original_setInterval;

describe("The MouseTracker", function() {
    beforeEach(function(){
        const _this = this;
        this.eventCall = <(event: any) => void> null;
    
        // Capture any added eventlisteners.
        global.document.addEventListener = function(ev: string, func: (event: any) => void) { _this.eventCall = func; };
        this.tracker = new MouseClickTracker();
        this.tracker.register();
        spyOn(this.tracker, "sendData");
    });
    
    it("should log mouse clicks", function() {
        expect(this.tracker.sendData).not.toHaveBeenCalled();
    
        // Simulate a mouse click
        this.eventCall({MouseEvent: "click"});
       
        expect(this.tracker.sendData).toHaveBeenCalled();
    });
});