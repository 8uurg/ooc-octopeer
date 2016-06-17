///<reference path="../../../../typings/index.d.ts" />

import {
    registerCheckbox, initialize,
    setupDatabaseLocationElements, setupCheckboxes, setupAnalyticsButton
} from "../../../main/js/extension/Settings";

let MockBrowser = require("mock-browser").mocks.MockBrowser;
let browser: any = new MockBrowser();

/**
 * Tests for popup.
 */
describe("The settings", function () {
    it("should initiate the checkboxes, database field & analytics button on DOM load", function () {
        let oldDocument = document;
        browser = new MockBrowser();
        document = browser.getDocument();
        let element = document.createElement("div");
        element.id = "database_location";
        element.innerHTML = "<div id='change-database-location'></div><div id='openAnalytics'></div>"
        document.body.insertBefore(element, document.body.firstChild);
        
        this.evt = document.createEvent("MutationEvents");
        this.evt.initMutationEvent("DOMContentLoaded", true, true, document, "", "", "", 0);
        spyOn(chrome.storage.sync, "get").and.callThrough();
        initialize();
        document.dispatchEvent(this.evt);
        expect(chrome.storage.sync.get).toHaveBeenCalledTimes(12);
        document = oldDocument;
    });
});

describe("The setup analytics", function () {
    it("should initiate the analytics button", function () {
        let oldDocument = document;
        browser = new MockBrowser();
        document = browser.getDocument();
        let evt = document.createEvent("MutationEvents");
        evt.initMutationEvent("DOMContentLoaded", true, true, document, "", "", "", 0);
        spyOn(chrome.storage.local, "get").and.callFake((_: {[key: string]: any}, callback: any ) => {
            callback({ [OCTOPEER_CONSTANTS.user_id_key]: "someID"});
        });
        
        let event = document.createEvent("HTMLEvents");
        event.initEvent("click", false, true);
        let element = document.createElement("div");
        element.id = "openAnalytics";
        document.body.insertBefore(element, document.body.firstChild);

        setupAnalyticsButton();
        document.dispatchEvent(evt);
        element.dispatchEvent(event);
        expect(chrome.storage.local.get).toHaveBeenCalled();
        document = oldDocument;
    });
});

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

describe("The checkboxes setup", function () {
    it("should register all checkboxes", function () {
        spyOn(chrome.storage.sync, "get").and.callThrough();
        setupCheckboxes();
        expect(chrome.storage.sync.get).toHaveBeenCalledTimes(11);
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

        setupDatabaseLocationElements();
        expect(this.databaseLocationTextField.value).toEqual(this.location);
    });

    it("should set the chrome setting to the field value when the apply button is pressed", function () {
        let dispatchClick: () => void = null;
        this.applyButton.addEventListener.and.callFake((event: string, callback: () => void) => {
            dispatchClick = callback;
        });
        this.databaseLocationTextField.value = this.location;
        spyOn(chrome.storage.sync, "set");

        setupDatabaseLocationElements();
        dispatchClick();

        expect(chrome.storage.sync.set).toHaveBeenCalledWith({
            [OCTOPEER_CONSTANTS.database_location_key]: this.location
        });
    });

    it("should not set the chrome setting if the value is not valid", function () {
        let dispatchClick: () => void = null;
        this.applyButton.addEventListener.and.callFake((event: string, callback: () => void) => {
            dispatchClick = callback;
        });
        this.databaseLocationTextField.value = "thisIsNotTheDBYouAreLookingFor";
        spyOn(chrome.storage.sync, "set");

        setupDatabaseLocationElements();
        dispatchClick();

        expect(chrome.storage.sync.set).not.toHaveBeenCalled();
    });
});