///<reference path="../../../typings/index.d.ts" />

/**
 * Created by Cas on 8-5-2016.
 */

import {RARequestsSender} from "../../main/js/RARequestSender";

describe("RARequestSender Tests", function() {

    it("should create an object and call register", function() {
        spyOn(chrome.runtime.onConnect, "addListener");
        let rarObject = new RARequestsSender("location");
        expect(rarObject.getApiLocation()).toEqual("location");
        expect(chrome.runtime.onConnect.addListener).toHaveBeenCalled();
        expect(rarObject.isSent()).toBeFalsy();
    });

    it("should have an api_location set", function() {
        let rarObject = new RARequestsSender(null);
        let returnValue = rarObject.sendRequest("table", {});
        expect(returnValue).toEqual(undefined);
    });

    let testArray = [
        {status: 200},
        {status: 201},
        {status: 202}
    ];

    testArray.forEach( function(item) {
        it("should send the request and set send to true if it succeeds.", function () {
            XMLHttpRequest.prototype.status = item.status;
            XMLHttpRequest.prototype.readyState = 4;
            let rarObject = new RARequestsSender("location");
            rarObject.sendRequest("table", {});
            expect(rarObject.isSent()).toBeTruthy();
        });
    });

    it("gulp should send the request and set send to false if it fails.", function() {
        XMLHttpRequest.prototype.status = 400;
        XMLHttpRequest.prototype.readyState = 4;
        let rarObject = new RARequestsSender("location");
        rarObject.sendRequest("table", {});
        expect(rarObject.isSent()).toBeFalsy();
    });
});