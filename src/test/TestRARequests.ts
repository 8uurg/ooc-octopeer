///<reference path="../../typings/main.d.ts" />
import {RARequestsSender} from '../main/js/RARequestsSender';

/**
 * Created by Cas on 8-5-2016.
 */
declare let global: any;

describe('RESTFul API requests', function() {

    it('should create an object', function() {
        expect(new RARequestsSender("location")).not.toBeNull(true);
        expect(new RARequestsSender("location").api_location).toEqual("location");
    });

    it('should trigger the sendRequest when calling sendUsername', function() {
        let rarObject = new RARequestsSender("someLocation");
        spyOn(rarObject, "sendRequest").and.callFake(function() {
            rarObject.setSend(true);
        });

        rarObject.sendUserName({"url":"someURL", "username":"someUsername"});

        expect(rarObject.getTable()).toEqual("users");
        expect(rarObject.getData()).toEqual({"url":"someURL", "username":"someUsername"});
        expect(rarObject.isSent()).toEqual(true);
    });

    it('should have an api_location set', function() {
        let rarObject = new RARequestsSender(null);
        rarObject.sendUserName({"url":"someURL", "username":"someUsername"});

        expect(rarObject.isSent()).toEqual(false);
    });
    
    it('should send the request, and set send to true if it succeeds.', function() {
        //Fake the XMLHttpRequest object so that the test can run.
        global.XMLHttpRequest = function() {
            this.open = function() {};
            this.setRequestHeader = function() {};
            this.onreadystatechange = function() {};
            this.send = function() {this.onreadystatechange()};
            // Force success
            this.status = 200;
        }

        let rarObject = new RARequestsSender("Test");
        rarObject.sendUserName({"url":"someURL", "username":"someUsername"});

        expect(rarObject.isSent()).toBeTruthy();
    });
    
    it('should send the request, and keep send at false.', function() {
        //Fake the XMLHttpRequest object so that the test can run.
        global.XMLHttpRequest = function() {
            this.open = function() {};
            this.setRequestHeader = function() {};
            this.onreadystatechange = function() {};
            this.send = function() {this.onreadystatechange()};
            // Force failure
            this.status = 201;
            this.readyState = 4;
        }

        let rarObject = new RARequestsSender("Test");
        rarObject.sendUserName({"url":"someURL", "username":"someUsername"});

        expect(rarObject.isSent()).toBeFalsy();
    });

    it('should set the right variables when sending a resolution', function() {
        let rarObject = new RARequestsSender(null);
        let date = new Date("09/10/2011 11:00:00");
        rarObject.sendResolution({"url":"someURL", "created_at":date, "width":2160,
            "height":1440, "session":"a"});
        expect(rarObject.isSent()).toEqual(false);
        expect(rarObject.getTable()).toEqual("window_resolution");
        expect(rarObject.getData()).toEqual({"url":"someURL", "created_at":date, "width":2160,
            "height":1440, "session":"a"});
    });
});