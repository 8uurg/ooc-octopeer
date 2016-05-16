///<reference path="../../typings/main.d.ts" />
let MockBrowser = require("mock-browser").mocks.MockBrowser;
declare var global: any;

let browser: any = new MockBrowser();
global.document = browser.getDocument();
global.localStorage = browser.getLocalStorage();

import {registerCheckbox} from "../main/js/popup";

/**
 * Tests for popup.
 */
describe("popup.ts tests", function () {
    beforeEach(function () {
        browser = new MockBrowser();
        global.document = browser.getDocument();
        global.localStorage = browser.getLocalStorage();
    });

    it("should restore state on registration when saved state is false.", function (){
        let body = <Element> document.getElementsByTagName("body")[0];
        localStorage.setItem("testStorageName", "false");
        // Create a checkbox to be used in this test.
        var checkbox = <HTMLInputElement> document.createElement("INPUT");
        checkbox.checked = true;
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", "some_value");
        body.appendChild(checkbox);

        registerCheckbox("testStorageName", "some_value");

        expect(checkbox.checked).toBeFalsy();
    });

    it("should restore state on registration when saved state is true.", function (){
        let body = <Element> document.getElementsByTagName("body")[0];
        localStorage.setItem("testStorageName", "true");
        // Create a checkbox to be used in this test.
        var checkbox = <HTMLInputElement> document.createElement("INPUT");
        checkbox.checked = false;
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", "some_value");
        body.appendChild(checkbox);

        registerCheckbox("testStorageName", "some_value");

        expect(checkbox.checked).toBeTruthy();
    });

    it("stores settings locally upon a click on the checkbox", function () {
        let body = <Element> document.getElementsByTagName("body")[0];
        localStorage.setItem("testStorageName", "false");
        // Create a checkbox to be used in this test.
        var checkbox = <HTMLInputElement> document.createElement("INPUT");
        checkbox.checked = false;
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", "some_value");
        body.appendChild(checkbox);

        registerCheckbox("testStorageName", "some_value");
        expect(checkbox.checked).toBeFalsy();
        expect(JSON.parse(localStorage.getItem("testStorageName"))).toBeFalsy();
        checkbox.click();
        expect(checkbox.checked).toBeTruthy();
        checkbox.click();
        expect(JSON.parse(localStorage.getItem("testStorageName"))).toBeTruthy();
        // FIXME: Due to a issue with how the fake dom works, 
        // it updates the checkedness of the checkbox after the event
        // Unlike in the browser, where it happens before the event.
        // This means the assertions in this test keep this in mind.
        // If this is fixed in the future and you encounter this comment,
        // Remove the second checkbox.click().
    });
});