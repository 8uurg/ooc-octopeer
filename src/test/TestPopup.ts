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
        browser.getDocument().createElement("body");
        global.document = browser.getDocument();
    });

    /**
     * Simulates a click on the DOM.
     * Source: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
     */
    function simulateClick(item: string) {
        var event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        browser.getElementById(item).dispatchEvent(event);
    }
    
    it("stores settings locally upon a click on the checkbox", function () {
        let body = <Element> document.getElementsByTagName("body")[0];
        var doc = browser.getDocument(),
            div = doc.createElement('div');
        body.appendChild(div);
        var storage = browser.getLocalStorage();
        
        // Create a checkbox to be used in this test.
        var checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", "some_value");
        body.appendChild(checkbox);
        registerCheckbox("testStorageName", "some_value");

        expect(JSON.parse(storage.getItem("testStorageName"))).toBeFalsy();
    });
});