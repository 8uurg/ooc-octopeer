///<reference path="../../typings/main.d.ts" />

// Nullroute the default creation of the KeystrokeTracker.
declare var global: any;
global.document = {};
global.document.addEventListener = function() {};
var original_setInterval = global.setInterval;
global.setInterval = function() {};

// Actual imports.
import {KeystrokeTracker} from '../main/js/keystrokeTracker';
global.setInterval = original_setInterval;

describe("KeystrokeTracker", function() {
    var eventCall: (event:any) => void = null;
    var tracker: KeystrokeTracker = null;
    
    beforeEach(function() {
        // Capture any added eventlisteners.
        global.document.addEventListener = function (ev:string, func:(event:any) => void) {
            eventCall = func;
        };
        tracker = new KeystrokeTracker();
        tracker.register();
        spyOn(tracker, "sendData");
    });

    it("should log a key press after the 'keyup' event with a 'default' key", function() {
        eventCall({keyBoardEvent: 'keyup', keyCode: 53});
        expect(tracker.sendData).toHaveBeenCalledWith('5');

        eventCall({keyBoardEvent: 'keyup', keyCode: 64});
        expect(tracker.sendData).toHaveBeenCalledWith('@');

        eventCall({keyBoardEvent: 'keyup', keyCode: 65});
        expect(tracker.sendData).toHaveBeenCalledWith('A');
    });
    
    it("should log a key press after the 'keyup' event with the 'backspace' key", function() {
        eventCall({keyBoardEvent: 'keyup', keyCode: 8});
        expect(tracker.sendData).toHaveBeenCalledWith('[Backspace]');
    });

    it("should log a key press after the 'keyup' event with the 'tab' key", function() {
        eventCall({keyBoardEvent: 'keyup', keyCode: 9});
        expect(tracker.sendData).toHaveBeenCalledWith('[Tab]');
    });

    it("should log a key press after the 'keyup' event with the 'enter' key", function() {
        eventCall({keyBoardEvent: 'keyup', keyCode: 13});
        expect(tracker.sendData).toHaveBeenCalledWith('[Enter]');
    });

    it("should log a key press after the 'keyup' event with the 'shift' key", function() {
        eventCall({keyBoardEvent: 'keyup', keyCode: 16});
        expect(tracker.sendData).toHaveBeenCalledWith('[Shift]');
    });

    it("should log a key press after the 'keyup' event with the 'control' key", function() {
        eventCall({keyBoardEvent: 'keyup', keyCode: 17});
        expect(tracker.sendData).toHaveBeenCalledWith('[Control]');
    });

    it("should log a key press after the 'keyup' event with the 'alt' key", function() {
        eventCall({keyBoardEvent: 'keyup', keyCode: 18});
        expect(tracker.sendData).toHaveBeenCalledWith('[Alt]');
    });

    it("should log a key press after the 'keyup' event with the 'caps lock' key", function() {
        eventCall({keyBoardEvent: 'keyup', keyCode: 20});
        expect(tracker.sendData).toHaveBeenCalledWith('[Caps Lock]');
    });

    it("should log a key press after the 'keyup' event with the 'escape' key", function() {
        eventCall({keyBoardEvent: 'keyup', keyCode: 27});
        expect(tracker.sendData).toHaveBeenCalledWith('[Escape]');
    });

    it("should log a key press after the 'keyup' event with the 'space' key", function() {
        eventCall({keyBoardEvent: 'keyup', keyCode: 32});
        expect(tracker.sendData).toHaveBeenCalledWith('[Space]');
    });

    it("should log a key press after the 'keyup' event with the 'page up' key", function() {
        eventCall({keyBoardEvent: 'keyup', keyCode: 33});
        expect(tracker.sendData).toHaveBeenCalledWith('[Page Up]');
    });

    it("should log a key press after the 'keyup' event with the 'page down' key", function() {
        eventCall({keyBoardEvent: 'keyup', keyCode: 34});
        expect(tracker.sendData).toHaveBeenCalledWith('[Page Down]');
    });

    it("should log a key press after the 'keyup' event with the 'end' key", function() {
        eventCall({keyBoardEvent: 'keyup', keyCode: 35});
        expect(tracker.sendData).toHaveBeenCalledWith('[End]');
    });

    it("should log a key press after the 'keyup' event with the 'home' key", function() {
        eventCall({keyBoardEvent: 'keyup', keyCode: 36});
        expect(tracker.sendData).toHaveBeenCalledWith('[Home]');
    });

    it("should log a key press after the 'keyup' event with the 'insert' key", function() {
        eventCall({keyBoardEvent: 'keyup', keyCode: 45});
        expect(tracker.sendData).toHaveBeenCalledWith('[Insert]');
    });

    it("should log a key press after the 'keyup' event with the 'delete' key", function() {
        eventCall({keyBoardEvent: 'keyup', keyCode: 46});
        expect(tracker.sendData).toHaveBeenCalledWith('[Delete]');
    });
});
