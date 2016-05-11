///<reference path="../../typings/main.d.ts" />

// Nullroute the default creation of the KeystrokeTracker.
declare var global: any;
global.document = {};
global.document.addEventListener = function() {};
var original_setInterval = global.setInterval;
global.setInterval = function() {};

// Actual imports.
import {KeystrokeTracker} from '../main/js/KeystrokeTracker';
global.setInterval = original_setInterval;

describe("KeystrokeTracker", function() {
    
    it("should log a key press after the 'keyup' event", function() {
        var eventCall: (event: any) => void = null;
        // Capture any added eventlisteners.
        global.document.addEventListener = function(ev: string, func: (event: any) => void) { eventCall = func; };
        var tracker = new KeystrokeTracker();
        tracker.register();
        spyOn(tracker, "sendData");
        
        //Test default case
        eventCall({keyBoardEvent: 'keyup', keyCode: 65});
        expect(tracker.sendData).toHaveBeenCalledWith('A');
        
        //Test all switch branches
        eventCall({keyBoardEvent: 'keyup', keyCode: 8});
        expect(tracker.sendData).toHaveBeenCalledWith('[Backspace]');

        eventCall({keyBoardEvent: 'keyup', keyCode: 9});
        expect(tracker.sendData).toHaveBeenCalledWith('[Tab]');

        eventCall({keyBoardEvent: 'keyup', keyCode: 13});
        expect(tracker.sendData).toHaveBeenCalledWith('[Enter]');

        eventCall({keyBoardEvent: 'keyup', keyCode: 16});
        expect(tracker.sendData).toHaveBeenCalledWith('[Shift]');

        eventCall({keyBoardEvent: 'keyup', keyCode: 17});
        expect(tracker.sendData).toHaveBeenCalledWith('[Control]');

        eventCall({keyBoardEvent: 'keyup', keyCode: 18});
        expect(tracker.sendData).toHaveBeenCalledWith('[Alt]');

        eventCall({keyBoardEvent: 'keyup', keyCode: 20});
        expect(tracker.sendData).toHaveBeenCalledWith('[Caps Lock]');

        eventCall({keyBoardEvent: 'keyup', keyCode: 27});
        expect(tracker.sendData).toHaveBeenCalledWith('[Escape]');

        eventCall({keyBoardEvent: 'keyup', keyCode: 32});
        expect(tracker.sendData).toHaveBeenCalledWith('[Space]');

        eventCall({keyBoardEvent: 'keyup', keyCode: 33});
        expect(tracker.sendData).toHaveBeenCalledWith('[Page Up]');

        eventCall({keyBoardEvent: 'keyup', keyCode: 34});
        expect(tracker.sendData).toHaveBeenCalledWith('[Page Down]');

        eventCall({keyBoardEvent: 'keyup', keyCode: 35});
        expect(tracker.sendData).toHaveBeenCalledWith('[End]');

        eventCall({keyBoardEvent: 'keyup', keyCode: 36});
        expect(tracker.sendData).toHaveBeenCalledWith('[Home]');

        eventCall({keyBoardEvent: 'keyup', keyCode: 45});
        expect(tracker.sendData).toHaveBeenCalledWith('[Insert]');

        eventCall({keyBoardEvent: 'keyup', keyCode: 46});
        expect(tracker.sendData).toHaveBeenCalledWith('[Delete]');
    });
});
