"use strict";
///<reference path="../../../../typings/index.d.ts" />

import {
    registerCheckbox, makeRefreshButtonFunctional,
    databaseLocationField
} from "../../../main/js/extension/Settings";

let MockBrowser = require("mock-browser").mocks.MockBrowser;
let browser: any = new MockBrowser();

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

    afterEach(function () {
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

describe("The refresh page notification", function () {

    beforeEach(function () {
        this.oldDocument = document;
        browser = new MockBrowser();
        document = browser.getDocument();
    });

    afterEach(function () {
        document = this.oldDocument;
    });

    it("should refresh all Bitbucket pages", function () {
        let element = jasmine.createSpyObj("a", ["addEventListener"]);
        let refreshNotification = document.createElement("div");
        spyOn(chrome.tabs, "reload");
        element.addEventListener.and.callFake((_: string, refreshPageCallback: any) => {
            refreshPageCallback();
        });
        spyOn(document, "getElementById").and.returnValues(element, refreshNotification);
        spyOn(chrome.tabs, "query").and.callFake((_: any, resultCallback: any) => {
            resultCallback([{ id: 4 }]);
        });

        makeRefreshButtonFunctional();
        expect(chrome.tabs.reload).toHaveBeenCalledWith(4);
    });
});

describe("The database input field", function () {
    beforeEach(function () {
        this.oldDocument = document;
        browser = new MockBrowser();
        document = browser.getDocument();
        this.location = "http://test-server.com/api/";
        this.databaseLocationTextField = jasmine.createSpyObj("div", ["addEventListener", "value", "className"]);
        this.applyButton = jasmine.createSpyObj("input", ["addEventListener"]);
        spyOn(document, "getElementById").and.returnValues(this.databaseLocationTextField, this.applyButton);
    });

    afterEach(function () {
        document = this.oldDocument;
    });

    it("should have the stored location on start up", function () {
        spyOn(chrome.storage.sync, "get").and.callFake((defaults: any, callback: any) => {
            callback({ [OCTOPEER_CONSTANTS.database_location_key]: this.location });
        });

        databaseLocationField();
        expect(this.databaseLocationTextField.value).toEqual(this.location);
    });

    it("should check whether the input is valid every time a key is pressed", function () {
        let dispatchKeyUp: () => void;
        this.databaseLocationTextField.addEventListener.and.callFake((event: string, callback: () => void) => {
            dispatchKeyUp = callback;
        });

        databaseLocationField();

        this.databaseLocationTextField.className = " valid";
        this.databaseLocationTextField.value += "y";
        dispatchKeyUp();
        expect(this.databaseLocationTextField.className).toMatch(new RegExp(" invalid"));
        this.databaseLocationTextField.value = this.location;
        dispatchKeyUp();
        expect(this.databaseLocationTextField.className).toMatch(new RegExp(" valid"));
    });
});