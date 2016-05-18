///<reference path="../../typings/index.d.ts" />
/**
 * Created by Cas on 8-5-2016.
 */
declare let global: any;

global.chrome = {
    runtime: {
        connect: function() {
            return {
                postMessage: function() {}
            };
        },
        onConnect: {
            addListener: function() {
                return {
                    onMessage: {}
                };
            }
        }
    }
};

import {RARequestsSender} from "../main/js/RARequestSender";

describe("RARequestSender Tests", function() {

    it("should create an object and call register", function() {
        spyOn(chrome.runtime.onConnect, "addListener");
        let rarObject = new RARequestsSender("location");
        expect(rarObject.api_location).toEqual("location");
        expect(chrome.runtime.onConnect.addListener).toHaveBeenCalled();
        expect(rarObject.isSent()).toBeFalsy();
    });

    it("should have an api_location set", function() {
        let rarObject = new RARequestsSender(null);
        let returnValue = rarObject.sendRequest("table", {});
        expect(returnValue).toEqual(undefined);
    });

    it("should send the request and set send to true if it succeeds.", function() {
        // Fake the XMLHttpRequest object so that the test can run.
        global.XMLHttpRequest = function() {
            this.open = function() {};
            this.setRequestHeader = function() {};
            this.onreadystatechange = function() {};
            this.send = function() {
                this.onreadystatechange();
            };
            // Force success
            this.status = 200;
            this.readyState = 4;
        };

        let rarObject = new RARequestsSender("location");
        rarObject.sendRequest("table", {});
        expect(rarObject.isSent()).toBeTruthy();
    });

    it("gulp should send the request and set send to false if it fails.", function() {
        // Fake the XMLHttpRequest object so that the test can run.
        global.XMLHttpRequest = function() {
            this.open = function() {};
            this.setRequestHeader = function() {};
            this.onreadystatechange = function() {};
            this.send = function() {
                this.onreadystatechange();
            };
            // Force failure
            this.status = 201;
            this.readyState = 4;
        };

        let rarObject = new RARequestsSender("location");
        rarObject.sendRequest("table", {});
        expect(rarObject.isSent()).toBeFalsy();
    });
});