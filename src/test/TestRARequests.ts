///<reference path="../../typings/main.d.ts" />
import {RARequests} from '../main/js/RARequests';

/**
 * Created by Cas on 8-5-2016.
 */
declare var global: any;

describe('RESTFul API requests', () => {

    it('should create an object', function() {
        expect(new RARequests("location")).not.toBeNull(true);
        expect(new RARequests("location").api_location).toEqual("location");
    });

    it('should trigger the sendRequest when calling sendUsername', function() {

        var rarObject = new RARequests("someLocation");
        spyOn(rarObject, "sendRequest").and.callFake(function() {
            rarObject.setSend(true);
        });

        rarObject.sendUserName({"url":"someURL", "username":"someUsername"});

        expect(rarObject.getTable()).toEqual("users");
        expect(rarObject.getData()).toEqual({"url":"someURL", "username":"someUsername"});
        expect(rarObject.getSend()).toEqual(true);
    });

    it('should have an api_location set', function() {
        var rarObject = new RARequests(null);
        rarObject.sendUserName({"url":"someURL", "username":"someUsername"});

        expect(rarObject.getSend()).toEqual(false);
    });
    
    it('should send the request, and set send to true if it succeeds.', function() {
        //Fake the XMLHttpRequest object so that the test can run.
        global.XMLHttpRequest = function() {
            this.open = function() {};
            this.setRequestHeader = function() {};
            this.send = function() {};
            this.status = 200;
        }
        
        var rarObject = new RARequests("Test");
        rarObject.sendUserName({"url":"someURL", "username":"someUsername"});

        expect(rarObject.getSend()).toBeTruthy();
    });
    
    it('should send the request, and keep send at false.', function() {
        //Fake the XMLHttpRequest object so that the test can run.
        global.XMLHttpRequest = function() {
            this.open = function() {};
            this.setRequestHeader = function() {};
            this.send = function() {};
            this.status = 201;
        }
        
        var rarObject = new RARequests("Test");
        rarObject.sendUserName({"url":"someURL", "username":"someUsername"});

        expect(rarObject.getSend()).toBeFalsy();
    });
});