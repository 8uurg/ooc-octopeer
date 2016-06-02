"use strict";
///<reference path="../../../../typings/index.d.ts" />

import {registerCheckbox} from "../../../main/js/extension/Settings";

let MockBrowser = require("mock-browser").mocks.MockBrowser;
let browser: any = new MockBrowser();
localStorage = browser.getLocalStorage();

/**
 * Tests for popup.
 */
describe("Settings.ts tests", function () {
    let checkbox: HTMLInputElement;
    beforeEach(function () {
        this.oldDocument = document;
        browser = new MockBrowser();
        document = browser.getDocument();

        // Create a checkbox to be used in the tests.
        let body = <Element> document.getElementsByTagName("body")[0];
        checkbox = <HTMLInputElement> document.createElement("INPUT");
        checkbox.checked = true;
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", "some_value");
        body.appendChild(checkbox);
    });

    afterEach(function() {
        document = this.oldDocument;
    });

    it("should restore state on registration when saved state is false.", function () {
        spyOn(chrome.storage.sync, "get").and.callFake((_: {[key: string]: any}, callback: any ) => {
            callback({"testStorageName": false});
        });

        registerCheckbox("testStorageName", "some_value");
        expect(checkbox.checked).toBeFalsy();
    });

    it("should restore state on registration when saved state is true.", function () {
        spyOn(chrome.storage.sync, "get").and.callFake((_: {[key: string]: any}, callback: any ) => {
           callback({"testStorageName": true});
        });

        registerCheckbox("testStorageName", "some_value");
        expect(checkbox.checked).toBeTruthy();
    });

    it("stores settings locally upon a click on the checkbox", function () {
        spyOn(chrome.storage.sync, "get").and.callFake((_: {[key: string]: any}, callback: any ) => {
            callback({"testStorageName": false});
        });
        spyOn(chrome.storage.sync, "set");
        registerCheckbox("testStorageName", "some_value");

        expect(checkbox.checked).toBeFalsy();
        checkbox.click();
        expect(checkbox.checked).toBeTruthy();
        checkbox.click();
        expect(chrome.storage.sync.set).toHaveBeenCalledWith({"testStorageName": true});
        /* FIXME: Due to a issue with how the fake dom works,
         * it updates the checkedness of the checkbox after the event
         * Unlike in the browser, where it happens before the event.
         * This means the assertions in this test keep this in mind.
         * If this is fixed in the future and you encounter this comment,
         * Remove the second checkbox.click().
         */
    });
});